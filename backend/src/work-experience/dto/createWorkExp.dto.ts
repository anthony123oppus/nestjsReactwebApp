import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator"
import { EmploymentStatus } from "src/typeorm/entities/Work"

export class CreateWorkExpDto {

    @IsNotEmpty()
    @IsString()
    companyName : string

    @IsNotEmpty()
    @IsString()
    jobTitle : string

    @IsNotEmpty()
    @IsString()
    employmentType : string

    @IsNotEmpty()
    @IsString()
    startMonth : string

    @IsNotEmpty()
    @IsString()
    startYear : string

    @IsNotEmpty()
    @IsEnum(EmploymentStatus)
    untilPresent : EmploymentStatus

    @ValidateIf(o => o.untilPresent === EmploymentStatus.NOT_PRESENT)
    @IsString()
    @IsNotEmpty()
    endMonth: string;

    @ValidateIf(o => o.untilPresent === EmploymentStatus.NOT_PRESENT)
    @IsString()
    @IsNotEmpty()
    endYear: string;

    @IsString()
    @IsNotEmpty()
    @IsNotEmpty()
    jobDescription : string

    @IsNotEmpty()
    monthlySalary : number
}