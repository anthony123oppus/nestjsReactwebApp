import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('project')
export class ProjectController {

    constructor(private readonly projectService : ProjectService) {}

    @Get()
    getProject() {
        return this.projectService.getAllProject()
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileFieldsInterceptor([
        {name : 'phoneImage', maxCount : 1},
        {name : 'desktopImage', maxCount : 1}
    ]))
    createProject(@UploadedFiles() file : {phoneImage : Express.Multer.File[], desktopImage : Express.Multer.File[]} ,@Body() createProject : CreateProjectDto){
        const projectData = {
            phoneImage : file.phoneImage[0].filename,
            desktopImage : file.desktopImage[0].filename,
            ...createProject
        }

        return this.projectService.createProject(projectData)
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileFieldsInterceptor([
        {name : 'phoneImage', maxCount : 1},
        {name : 'desktopImage', maxCount : 1}
    ]))
    updatedProject(@Param('id', ParseIntPipe) id: number, @UploadedFiles() file : {phoneImage : Express.Multer.File[], desktopImage : Express.Multer.File[]}, @Body() updProject : CreateProjectDto){
        const projectData = {
            phoneImage : file.phoneImage[0].filename,
            desktopImage : file.desktopImage[0].filename,
            ...updProject
        }

        return this.projectService.updateProject(id, projectData)
    }

    @Delete(':id')
    deleteProject(@Param('id', ParseIntPipe ) id : number){
        return this.projectService.deleteProject(id)
    }
}
