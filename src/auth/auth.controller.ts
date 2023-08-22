import {Body, Controller, Post} from '@nestjs/common'
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Controller('auth')
export class AuthController{ 
    constructor(private authService: AuthService, private prismaService : PrismaService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto){
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: AuthDto){
        return this.authService.signin(dto)
    }
    
}