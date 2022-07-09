import { Optional } from "@nestjs/common"
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"
import { IsExist } from "src/etc/validator/exist-validator"
import { User } from "../entities/user.entity"

export class CreateUserDto {
    @Optional()
    id?: number

    @IsString()
    @MaxLength(200)
    nama_user: string

    @IsEmail()
    // @IsExist([User, 'email'])
    email: string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    username: string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string
}
