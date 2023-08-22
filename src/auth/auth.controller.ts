import {Body, Controller, Post} from '@nestjs/common'
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto){
        console.log({dto})
        return this.authService.signup()
    }


    // @Post('signup')
    // signup(@Body('email') email: string, @Body('password') password: string){
    //     // could use pipe for validating if the request parameter is of the correct type
    //     console.log({email, password})
    //     return this.authService.signup()
    // }

    @Post('signin')
    signin(){
        return this.authService.signin()
    }
    
}