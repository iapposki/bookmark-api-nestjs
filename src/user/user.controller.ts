import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    getMe(@GetUser() user: User, @GetUser('email') email: string ){
        // console.log({user: user})
        console.log(email)
        return user
    }

    @Patch('me')
    editUser(@GetUser('id') userId: number, @Body() dto:EditUserDto) {
        return this.userService.editUser(userId, dto)
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
