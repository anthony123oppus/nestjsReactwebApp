import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateWorkExpDto } from 'src/work-experience/dto/createWorkExp.dto';

@Injectable()
export class SalaryTransformPipePipe implements PipeTransform {
  transform(value: CreateWorkExpDto, metadata: ArgumentMetadata) {

    const salaryParse = parseFloat(value.monthlySalary.toString())

    if(isNaN(salaryParse)){
      throw new HttpException(`${value.monthlySalary} is not a number`, HttpStatus.BAD_REQUEST)
    }

    return {monthlySalary : salaryParse, ...value};
  }
}
