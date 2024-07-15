import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {

    @IsNotEmpty({message : 'Project Name must not be Empty'})
    @IsString()
    name : string

    @IsNotEmpty({message : 'TechStack must not be empty'})
    @IsString()
    techStack : string

    @IsString()
    link : string

    phoneImage : string

    desktopImage : string
}