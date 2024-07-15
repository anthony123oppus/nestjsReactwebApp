import { Module } from "@nestjs/common";
import { SkillsController } from "./skills.controller";
import { SkillsService } from "./skills.service";
import { Skill } from "src/typeorm/entities/Skill";
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from 'multer';
import { MulterModule } from "@nestjs/platform-express";
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Skill]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          // const randomName = Array(4)
          //   .fill(null)
          //   .map(() => Math.round(Math.random() * 16).toString(16))
          //   .join('');
          callback(null, `${name}-${Date.now()}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg)$/)) {
          return callback(new Error('Only JPEG images are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
