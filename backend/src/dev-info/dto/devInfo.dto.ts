import { IsNotEmpty, IsString } from "class-validator";

export class DevInfoDto {

    @IsNotEmpty()
    @IsString()
    firstName : string

    @IsNotEmpty()
    @IsString()
    middleName : string

    @IsNotEmpty()
    @IsString()
    lastName : string

    @IsNotEmpty()
    age : number

    @IsNotEmpty()
    birthDate : string

    @IsNotEmpty()
    gender : string

    @IsNotEmpty()
    @IsString()
    devMotto : string

    devImage : string
}