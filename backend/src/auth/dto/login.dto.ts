import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    username : string

    @IsNotEmpty()
    @IsString()
    password : string
}