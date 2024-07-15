import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Degree } from 'src/typeorm/entities/Degree';
import { Repository } from 'typeorm';
import { EducationDTO } from './dto/education.dto';
import { Education } from 'src/typeorm/entities/Education';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EducationService {

    constructor(
        @InjectRepository(Degree) private degreeRepository : Repository<Degree>,
        @InjectRepository(Education) private educationRepository : Repository<Education>
    ) {}

    async getEducation () {
        const allEducation = await this.educationRepository.find({relations : ['degree']})

        if(allEducation.length === 0) {
           return {message : 'Education Table has no data'}
        }

        return allEducation
    }


    async createEducation (educationData : EducationDTO) {

        // Fetch the degree by ID from the database
        const degree = await this.degreeRepository.findOne({where : {id : educationData.degree}});

        // gi check kung naba ang id sa degree na table dayun return error kung wala
        if (!degree) {
            throw new HttpException(`Degree with ID ${educationData.degree} not found`, HttpStatus.NOT_FOUND);
        }

        // gi kuha nako kung naa exist naba ang data
        const existEduc = await this.educationRepository.findOne({relations : ['degree'], where: {schoolName : educationData.schoolName, degree : {id : educationData.degree}}})

        if(existEduc) {
            throw new HttpException(`Education Attainment with an SchoolName ${educationData.schoolName} and degree of ${degree.degree} already exist`, HttpStatus.BAD_REQUEST)
        }

        // Create a new Education entity and associate it with the fetched Degree
        const newEducation = this.educationRepository.create({
            ...educationData,
            degree
        });

        // Save the new Education entity
        const savedEducation = await this.educationRepository.save(newEducation);

        return savedEducation;
    }

    async updateEducation(id : number, educationData : EducationDTO){
        const updateData = await this.educationRepository.findOne({relations : ['degree'], where:{id}})

        if(!updateData) {
            throw new HttpException(`Education data with an id of ${id} is not found`,  HttpStatus.NOT_FOUND)
        }

        if (educationData.schoolImage && updateData.schoolImage) {
            this.deleteImage(updateData.schoolImage);
        }

        const newEducation = this.educationRepository.create({
            ...educationData,
            degree : updateData.degree
        })

        await this.educationRepository.update(id, newEducation)

        const updatedData = await this.educationRepository.findOne({relations : ['degree'],  where : {id}})

        return updatedData

    }

    async deleteEducation(id : number){
        const educationExist = await this.educationRepository.findOne({where : {id}})

        if(!educationExist){
            throw new HttpException(`Education with and id of ${id} is not found`, HttpStatus.NOT_FOUND)
        }

        if(educationExist.schoolImage){
            this.deleteImage(educationExist.schoolImage)
        }

        await this.educationRepository.delete(id)

        return {message : `Education with an id of ${id} deleted successfully`}
        
    }


    async getDegree () {
        const degrees = await this.degreeRepository.find()

        if(degrees.length === 0){
            return {message : 'Degree Table has no data'}
        }

        return degrees
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
