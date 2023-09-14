import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User){
        console.log({user: user})
        return "user info"
    }
}



// import { Controller, Get, UseGuards, Req } from '@nestjs/common';
// import { Request } from 'express';
// import { JwtGuard } from 'src/auth/guard';

// @Controller('user')
// export class UserController {
//     @UseGuards(JwtGuard)
//     @Get('me')
//     getMe(@Req() req: Request ){
//         console.log({user: req.user})
//         return "user info"
//     }
// }
