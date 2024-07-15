import { Module} from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DevInfoController } from './dev-info.controller';
import { DevInfoService } from './dev-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevInfo } from '../typeorm/entities/DevInfo';
import { AdminAccount } from 'src/typeorm/entities/Admin';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports : [
    TypeOrmModule.forFeature([DevInfo, AdminAccount]),
    // MulterModule.register({
    //   dest : './uploads'
    // })
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
  controllers: [DevInfoController],
  providers: [DevInfoService]
})
export class DevInfoModule {}
