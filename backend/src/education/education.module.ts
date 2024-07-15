import { Module } from "@nestjs/common";
import { EducationController } from "./education.controller";
import { EducationService } from "./education.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Degree } from "src/typeorm/entities/Degree";
import { Education } from "src/typeorm/entities/Education";
import { diskStorage } from 'multer';
import { MulterModule } from "@nestjs/platform-express";
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Degree, Education]),
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
        console.log(file.mimetype)
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error("Only JPEG images rare allowed!"), false);
        }
        callback(null, true);
      },
    }),
  ],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
