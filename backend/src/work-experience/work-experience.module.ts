import { Module } from '@nestjs/common';
import { WorkExperienceController } from './work-experience.controller';
import { WorkExperienceService } from './work-experience.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkExperience } from 'src/typeorm/entities/Work';

@Module({
  imports: [TypeOrmModule.forFeature([WorkExperience])],
  controllers: [WorkExperienceController],
  providers: [WorkExperienceService]
})
export class WorkExperienceModule {}
