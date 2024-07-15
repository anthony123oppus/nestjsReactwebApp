import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DevInfo } from "./src/typeorm/entities/DevInfo";
import { AdminAccount } from "./src/typeorm/entities/Admin";
import { DataSource } from "typeorm";
import { Skill } from "./src/typeorm/entities/Skill";
import { WorkExperience } from "./src/typeorm/entities/Work";
import { Degree } from "./src/typeorm/entities/Degree";
import { Education } from "./src/typeorm/entities/Education";
import { Project } from "./src/typeorm/entities/Project";

config()

const configService = new ConfigService()

export default new DataSource({
    type : 'mysql',
    host: configService.getOrThrow('MYSQL_HOST'),
    port: configService.getOrThrow('MYSQL_PORT'),
    database: configService.getOrThrow('MYSQL_DATABASE'),
    username: configService.getOrThrow('MYSQL_USERNAME'),
    password: configService.getOrThrow('MYSQL_PASSWORD'),
    synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
    migrations : ['src/migrations/**'],
    entities : [DevInfo, AdminAccount,Skill, WorkExperience, Degree, Education, Project]
})