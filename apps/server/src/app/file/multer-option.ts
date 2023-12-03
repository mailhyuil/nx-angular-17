import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

export const options: MulterOptions = {
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath: string = 'public';
      if (!existsSync(uploadPath)) {
        // public 폴더가 존재하지 않을시, 생성
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },

    filename: (request, file, callback) => {
      callback(null, 'hi.png'); // filename uuid로 변환해서 지정하기
    },
  }),
};
