import {ForbiddenException, Injectable} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto } from './dto'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

@Injectable({})
export class AuthService{
    constructor(private prisma : PrismaService){}
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
                    delete user.hash
            
                    // return the saved user
                    return user; 
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
        delete user.hash
        return user

    }
}
