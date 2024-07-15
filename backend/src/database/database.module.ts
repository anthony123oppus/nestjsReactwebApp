import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAccount } from 'src/typeorm/entities/Admin';
import { Degree } from 'src/typeorm/entities/Degree';
import { DevInfo } from 'src/typeorm/entities/DevInfo';
import { Education } from 'src/typeorm/entities/Education';
import { Project } from 'src/typeorm/entities/Project';
import { Skill } from 'src/typeorm/entities/Skill';
import { WorkExperience } from 'src/typeorm/entities/Work';

@Module({
    imports : [
        TypeOrmModule.forRootAsync({
            useFactory: (configService : ConfigService) => (
                {
                    type : 'mysql',
                    host: configService.getOrThrow('MYSQL_HOST'),
                    port: configService.getOrThrow('MYSQL_PORT'),
                    database: configService.getOrThrow('MYSQL_DATABASE'),
                    username: configService.getOrThrow('MYSQL_USERNAME'),
                    password: configService.getOrThrow('MYSQL_PASSWORD'),
                    entities : [DevInfo, AdminAccount, Skill, WorkExperience, Degree, Education, Project],
                    synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
                }
            ),
            inject: [ConfigService],
        })
    ]
})
export class DatabaseModule {}
