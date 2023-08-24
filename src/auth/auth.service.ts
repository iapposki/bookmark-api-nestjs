import {ForbiddenException, Injectable} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt/dist'
import { AuthDto } from './dto'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import {ConfigService} from '@nestjs/config'

import { PrismaService } from 'src/prisma/prisma.service'


@Injectable({})
export class AuthService{
    constructor(private prisma : PrismaService, private jwt: JwtService, private config: ConfigService){}
    async signup(dto : AuthDto){
        // console.log({dto})

        // generate the password hash
        const hash = await argon.hash(dto.password)

        try{
            
                    // save the new user in the db
                    const user = await  this.prisma.user.create({
                        data: {
                            email : dto.email,
                            hash,
                            firstName : dto.firstName,
                            lastName : dto.lastName
                        }
                    })
            
                    // return the saved user
                    return this.signToken(user.id, user.email)
        } catch(error) {
            console.log(error)
            if (error instanceof PrismaClientKnownRequestError){
                if (error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken')
                } else {
                    throw error
                }
            } else {
                throw error
            }
        }
    }

    async signin(dto : AuthDto){
        
        // find if user exists. if not throw exception
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        })

        if (!user) {
            throw new ForbiddenException('Credentials incorrect')
        };

        // check the credentials, throw error is dont match
        const passCheck = await argon.verify(user.hash, dto.password);

        if (!passCheck) {
            throw new ForbiddenException('Credentials incorrect')
        }

        // return user.
        return this.signToken(user.id, user.email)

    }

    async signToken(userId: number, email: string): Promise<{accessToken:string}> {
        const payload = {
            // sub is convention for using unique identifier in jwt
            sub: userId,
            email,
        }
        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        })
        return {
            accessToken: token,
        }
    }
}
