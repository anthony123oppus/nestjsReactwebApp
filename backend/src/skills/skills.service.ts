import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from 'src/typeorm/entities/Skill';
import { skillTypes } from 'src/types/skill';
import { ILike, Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SkillsService {

    constructor(@InjectRepository(Skill) private skillsRepository : Repository<Skill>) {}

    async getSkills(options: IPaginationOptions, search?: string): Promise<Pagination<Skill>> {

        const queryBuilder = this.skillsRepository.createQueryBuilder('skill');

        console.log(search)

        if (search) {
        queryBuilder.where('skill.level = :search', { search});
        }

        // console.log("SQL Query:", queryBuilder.getSql()); 

        const allSkills = paginate<Skill>(queryBuilder, options);

        return allSkills
    }

    async create(skillDto : skillTypes ) {
        const skillExist  = await this.skillsRepository.findOne({
            where : { name : skillDto.name}
        })

        if(skillExist){
          throw new HttpException(`${skillDto.name} already Exist`, HttpStatus.BAD_REQUEST)
        }

        const saveSkill = await this.skillsRepository.save(skillDto)
        return saveSkill
    }

    async update(id : number, skillDto : skillTypes) {
        const skillExist  = await this.skillsRepository.findOne({
            where : { id}
        })

        if(!skillExist) {
            throw new HttpException(`Skill with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        // Delete the old image if a new one is provided
        if (skillDto.image && skillExist.image) {
            this.deleteImage(skillExist.image);
        }

        await this.skillsRepository.update(id, skillDto)
        const updatedSkill = await this.skillsRepository.findOne({where: {id}})

        return updatedSkill
    }

    async delete(id: number){
        const deleteUser = await this.skillsRepository.findOne({
            where : {id}
        })

        if(!deleteUser) {
            throw new HttpException(`Skill with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        if(deleteUser.image) {
            this.deleteImage(deleteUser.image)
        }

        await this.skillsRepository.delete(id)

        return {message : `${deleteUser.name} Deleted Successfully`}
    }

    async countData(level?: string){
        if(level){
            return await this.skillsRepository.countBy({level})
        }
        return await this.skillsRepository.count()
    }

    async dataPieGraph(){
        const level = ['Beginner', 'Average', 'Advanced', 'Expert']

        const levelData = await Promise.all(
            level.map(async (item) => ({
                x: item,
                y: await this.countData(item),
            }))
        );
        return levelData
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
