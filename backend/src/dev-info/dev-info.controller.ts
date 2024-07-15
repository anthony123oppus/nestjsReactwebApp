import { Controller, Post, Get, Param, ParseIntPipe, Body, UsePipes, ValidationPipe, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DevInfoDto } from './dto/devInfo.dto';
import { DevInfoService } from './dev-info.service';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';


@Controller('dev-info')
export class DevInfoController {

    constructor(private readonly devInfoService : DevInfoService) {}

    @Get()
    getAdminAccount(){
        return this.devInfoService.getAccount()
    }

    @Post(':id/info')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('devImage')) // Intercept 'devImage' field
    create(@Param('id', ParseIntPipe) id : number, @UploadedFile() file: Express.Multer.File, @Body() devInfoDto : DevInfoDto ){
      const devData = {
        devImage : file.filename,
        ...devInfoDto,
    }  
      
      return this.devInfoService.createDevInfo(id , devData)
    }

    @Patch(':id/info')
  @UseInterceptors(FileInterceptor('devImage')) // Intercept 'devImage' field
  async update(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @Body() devInfoDto: DevInfoDto) {
    const devData = {
        devImage : file.filename,
        ...devInfoDto,
    }

    return this.devInfoService.updateDevInfo(id, devData);
  }
}
