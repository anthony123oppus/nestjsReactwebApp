import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateSkillsDto } from 'src/skills/dto/skills.dto';

@Injectable()
export class YrsTransformPipe implements PipeTransform {
  transform(value: CreateSkillsDto , metadata: ArgumentMetadata) {

    const parseYrsExp = parseFloat(value.yrsExperience.toString())

    if(isNaN(parseYrsExp)){
      throw new HttpException(`${value.yrsExperience} is not a number`, HttpStatus.BAD_REQUEST)
    }

    return {yrsExperience : parseYrsExp, ...value};
  }
}
