import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateSkillsDto {

    @IsNotEmpty()
    @IsString()
    name : string

    @IsNotEmpty()
    @IsString()
    level : string

    @IsNotEmpty()
    @IsNumberString()
    yrsExperience : number

    image : string
}