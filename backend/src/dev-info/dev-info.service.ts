import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminAccount } from '../typeorm/entities/Admin';
import { DevInfo } from '../typeorm/entities/DevInfo';
import { devInfoTypes } from 'src/types/devInfo';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DevInfoService {

    constructor(
        @InjectRepository(DevInfo) private devInfoRepository : Repository<DevInfo>,
        @InjectRepository(AdminAccount) private adminRepository : Repository<AdminAccount>
    ){}

    async createDevInfo(id : number, devInfoData : devInfoTypes) {
        const devAccount = await this.adminRepository.findOne({
            where: { id },
            relations: ['devInfo'], // Ensure devInfo is loaded with the Admin entity
        });

        if(!devAccount) throw new HttpException(`Admin id ${id} is incorrect`, HttpStatus.BAD_REQUEST)

        const addDevINfo = this.devInfoRepository.create(devInfoData)

        const saveDevInfo = await this.devInfoRepository.save(addDevINfo)
        devAccount.devInfo = saveDevInfo

        return this.adminRepository.save(devAccount)
    }

    async updateDevInfo(id : number, devInfoData : devInfoTypes) {
        const devAccount = await this.adminRepository.findOne({
            where: { id },
            relations: ['devInfo'], // Ensure devInfo is loaded with the Admin entity
        });
        // console.log(devAccount)

        if(!devAccount) throw new HttpException(`Admin id ${id} is incorrect`, HttpStatus.BAD_REQUEST)

        // Delete the old image if a new one is provided
        if (devInfoData.devImage && devAccount.devInfo.devImage) {
            this.deleteImage(devAccount.devInfo.devImage);
        }
        
        await this.devInfoRepository.update(devAccount.devInfo.id, devInfoData)

        const updatedDevAccount = await this.adminRepository.findOne({
            where: { id },
            relations: ['devInfo'], // Ensure devInfo is loaded with the Admin entity
        });

        return updatedDevAccount
    }

    async getAccount(){
        const adminAccount = this.adminRepository.find({relations : ['devInfo']})

        return adminAccount
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
