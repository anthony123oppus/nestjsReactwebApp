import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from 'multer';
import { MulterModule } from "@nestjs/platform-express";
import { extname } from 'path';
import { Project } from 'src/typeorm/entities/Project';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    MulterModule.register({
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const name = file.originalname.split(".")[0];
          const fileExtName = extname(file.originalname);
          // const randomName = Array(4)
          //   .fill(null)
          //   .map(() => Math.round(Math.random() * 16).toString(16))
          //   .join('');
          callback(null, `${name}-${Date.now()}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error("Only JPEG images rare allowed!"), false);
        }
        callback(null, true);
      },
    }),
  ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
