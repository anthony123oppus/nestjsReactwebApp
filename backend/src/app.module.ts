import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Database
import { DatabaseModule } from './database/database.module';

// Entities
import { DevInfoModule } from './dev-info/dev-info.module';
import { AuthModule } from './auth/auth.module';
import { SkillsModule } from './skills/skills.module';
import { WorkExperienceModule } from './work-experience/work-experience.module';
import { EducationModule } from './education/education.module';
import { ProjectModule } from './project/project.module';
import { BackupService } from './backup/backup.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    DatabaseModule,
    // access image publicly start code
    ServeStaticModule.forRoot({
      // maong duha iyang in ani na code '..' - ('..', '..') para dili siya sa dist musulod
      rootPath: join(__dirname, '..', '..', 'uploads'), // Path to your static assets
      serveRoot: '/uploads', // URL path to serve static assetsss
    }),
    // access image publicly end code
    ConfigModule.forRoot({ isGlobal: true }),
    DevInfoModule,
    AuthModule,
    SkillsModule,
    WorkExperienceModule,
    EducationModule,
    ProjectModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, BackupService],
})
export class AppModule {}
