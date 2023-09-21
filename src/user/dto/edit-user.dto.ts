import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditUserDto {
    @IsEmail()
    @IsNotEmpty()
    email?: string

    @IsString()
    @IsOptional()
    firstName?: string

    @IsOptional()
    @IsString()
    lastName?: string
}