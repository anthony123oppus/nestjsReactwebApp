import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { ProjectService } from 'src/project/project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/typeorm/entities/Project';
import { Skill } from 'src/typeorm/entities/Skill';
import { SkillsService } from 'src/skills/skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project,Skill])],
  controllers: [DashboardController],
  providers : [ProjectService,SkillsService]
})
export class DashboardModule {}
