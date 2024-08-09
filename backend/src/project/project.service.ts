import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/typeorm/entities/Project';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/createProject.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProjectService {

    constructor(@InjectRepository(Project) private projectRepository : Repository<Project>) {}

    async getAllProject() {
        const allProject = await this.projectRepository.find()

        if(allProject.length === 0){
            return {message : 'Project table have no data'}
        }

        return allProject
    }

    async createProject(createProject : CreateProjectDto){
        const projectExist = await this.projectRepository.findOne({where : {name : createProject.name}})

        if(projectExist) {
            throw new HttpException(`Project with the project name ${createProject.name} already Exist`, HttpStatus.BAD_REQUEST)
        }

        const saveProject = await this.projectRepository.save(createProject)

        return saveProject
    }

    async updateProject(id: number, updateProject : CreateProjectDto ){
        const findProject = await this.projectRepository.findOne({where : {id}})

        if(!findProject){
            throw new HttpException(`Project with an id of ${id} not found`, HttpStatus.NOT_FOUND)
        }

        if(findProject.desktopImage && updateProject.desktopImage){
            this.deleteImage(findProject.desktopImage)
        }
        if(findProject.phoneImage && updateProject.phoneImage){
            this.deleteImage(findProject.phoneImage)
        }

        await this.projectRepository.update(id, updateProject)

        const updatedProject = await this.projectRepository.findOne({where : {id}})

        return updatedProject
    }

    async deleteProject(id : number){
        const findProject = await this.projectRepository.findOne({where : {id}})

        if(!findProject){
            throw new HttpException(`Project with an id of ${id} not found`, HttpStatus.NOT_FOUND)
        }

        if(findProject.desktopImage){
            this.deleteImage(findProject.desktopImage)
        }
        if(findProject.phoneImage){
            this.deleteImage(findProject.phoneImage)
        }

        await this.projectRepository.delete(id)

        return {message : `Project with an id ${id} deleted Successfully`}
    }

    async countAllproject() {
        return await this.projectRepository.count()
    }

    private deleteImage(imagePath: string) {
        const fullImagePath = path.resolve(__dirname, '../../../uploads', imagePath);
        fs.unlink(fullImagePath, (err) => {
            if (err) {
                console.error(`Failed to delete image at ${fullImagePath}: `, err);
            }
        });
    }
}
