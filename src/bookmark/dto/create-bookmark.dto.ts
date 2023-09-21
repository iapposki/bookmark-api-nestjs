import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateBookmarkDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    author: string

    @IsOptional()
    @IsString()
    description?: string

    @IsNotEmpty()
    @IsString()
    link: string
}