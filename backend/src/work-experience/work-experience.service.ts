import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkExperience } from 'src/typeorm/entities/Work';
import { workExperienceTypes } from 'src/types/workExp';
import { Repository } from 'typeorm';

@Injectable()
export class WorkExperienceService {

    constructor(@InjectRepository(WorkExperience) private workExperienceRepository : Repository<WorkExperience>){}

    async getWorkExperience(){
        const workExp = await this.workExperienceRepository.find()

        if(workExp.length === 0){
            return {message : 'There no work experience Data yet'}
        }

        return workExp
    }

    async createWorkExperience(workExpData : workExperienceTypes){
        return this.workExperienceRepository.save(workExpData)
    }

    async updateWorkExperience(id: number, workExpData : workExperienceTypes){
        const updateDataExist = await this.workExperienceRepository.findOne({where : {id}})

        if(!updateDataExist){
            throw new HttpException(`Work Experience with an id  ${id} not Found`, HttpStatus.NOT_FOUND)
        }

        await this.workExperienceRepository.update(id, workExpData)
        const updateData = await this.workExperienceRepository.findOne({where : {id}})

        return updateData
    }

    async deleteWorkExperience(id : number){
        const deleteDataExist = await this.workExperienceRepository.findOne({where : {id}})

        if(!deleteDataExist){
            throw new HttpException(`Work Experience with an id  ${id} not Found`, HttpStatus.NOT_FOUND)
        }

        await this.workExperienceRepository.delete(id)

        return {message : `${deleteDataExist.companyName} Deleted Successfully`}
    }
}
