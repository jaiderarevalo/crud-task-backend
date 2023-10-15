import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class LoginUserDto{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email:string
    @IsNotEmpty()
    @Length(8,20)
    readonly password:string
}