import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { SkillsService } from "./skills.service";
import { CreateSkillsDto } from "./dto/skills.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { YrsTransformPipe } from "./pipe/yrs-transform/yrs-transform.pipe";
import { Skill } from "src/typeorm/entities/Skill";

@Controller("skills")
export class SkillsController {
  constructor(private readonly skillService: SkillsService) {}

  @Get()
  async getSkills(@Query('page') page = 1, @Query('limit') limit = 7, @Query('search') search? : string): Promise<Pagination<Skill>> {

    const options: IPaginationOptions = {
      page,
      limit,
      route: '/skills',
  };

    const skillSet = await this.skillService.getSkills(options, search)
    // if(skillSet..length === 0){
    //   return {message : `Skills don't have any Data yet`}
    // }
    return skillSet
  }

  @Post() 
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('image')) // Intercept 'image' field
  create(@UploadedFile() file: Express.Multer.File, @Body(YrsTransformPipe) skillDto : CreateSkillsDto) {
    const skillData = {
        image : file.filename,
        ...skillDto,
    }

    return this.skillService.create(skillData)
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('image')) // Intercept 'image' field
  update(@Param('id', ParseIntPipe) id : number, @UploadedFile() file: Express.Multer.File, @Body(YrsTransformPipe) skillDto : CreateSkillsDto) {
    const skillData = {
        image : file.filename,
        ...skillDto,
    }

    return this.skillService.update(id,skillData)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id : number){
    return this.skillService.delete(id)
  }
}
