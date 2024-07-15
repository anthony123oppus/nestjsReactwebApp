import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class EducationDTO {

    @IsString()
    @IsNotEmpty({message : 'Name of School must not be empty'})
    schoolName : string

    @IsString()
    @IsNotEmpty({message : 'Course must not be empty'})
    course : string

    @IsString()
    @IsNotEmpty({message : 'Month Graduated must not be empty'})
    monthGraduated : string

    @IsString()
    @IsNotEmpty({message : 'Year Graduated must not be empty'})
    yearGraduated : string

    @IsString()
    @IsNotEmpty({message : 'School Address must not be empty'})
    schoolAddress : string

    @IsNotEmpty()
    degree : number

    schoolImage : string
}