import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationDTO } from './dto/education.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@Controller('education')
export class EducationController {

    constructor(private readonly educationService : EducationService) {}


    @Get()
    getEducation() {
        return this.educationService.getEducation()
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('schoolImage'))
    createEducation(@UploadedFile() file : Express.Multer.File , @Body() educationDtoData : EducationDTO ) {
        const educationData = {
            schoolImage : file.filename,
            ...educationDtoData
        }

        return this.educationService.createEducation(educationData)
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('schoolImage'))
    updateEducation(@Param('id', ParseIntPipe) id : number ,@UploadedFile() file : Express.Multer.File, @Body() educationDtoData : EducationDTO) {
        const educationData = {
            schoolImage : file.filename,
            ...educationDtoData
        }

        return this.educationService.updateEducation(id, educationData)
    }

    @Delete(':id')
    deleteEducation(@Param('id') id : number){
        return this.educationService.deleteEducation(id)
    }

    @Get('degree')
    optionDegree() {
        return this.educationService.getDegree()
    }

}
