import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { WorkExperienceService } from './work-experience.service';
import { CreateWorkExpDto } from './dto/createWorkExp.dto';
import { SalaryTransformPipePipe } from './pipe/salary-transform-pipe/salary-transform-pipe.pipe';

@Controller('workExperience')
export class WorkExperienceController {

    constructor(private readonly workExperienceService : WorkExperienceService) {}

    @Get()
    getWorkExp(){
        return this.workExperienceService.getWorkExperience()
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body(SalaryTransformPipePipe) workDataDto : CreateWorkExpDto) {
        return this.workExperienceService.createWorkExperience(workDataDto)
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    update(@Param('id', ParseIntPipe) id : number,@Body(SalaryTransformPipePipe) workDataDto : CreateWorkExpDto) {
        return this.workExperienceService.updateWorkExperience(id, workDataDto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id  : number){
        return this.workExperienceService.deleteWorkExperience(id)
    }

}
