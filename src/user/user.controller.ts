import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {

    @Get('me')
    getMe(@GetUser() user: User, @GetUser('email') email: string ){
        console.log({user: user})
        console.log(email)
        return user
    }

    @Patch()
    editUser() {}
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
