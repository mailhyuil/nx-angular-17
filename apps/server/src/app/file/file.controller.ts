import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import ffmpeg from 'fluent-ffmpeg';
import { join } from 'path';
import { options } from './multer-option';

@Controller('file')
export class FileController {
  @Post()
  @UseInterceptors(FileInterceptor('file', options))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    ffmpeg()
      .input(join(__dirname, 'assets', 'sample.mp4'))
      .outputOptions('-vf', 'scale=1280:720') // 새로운 해상도 지정 (여기서는 1280x720)
      .on('progress', (progress) => {
        console.log(`Processing: ${progress.percent}% done`);
      })
      .on('end', () => {
        console.log('해상도 변환이 완료되었습니다.');
      })
      .on('error', (err) => {
        console.error('오류 발생:', err);
      })
      .save(join(__dirname, 'newVideo.mp4'));
  }

  @Post('multiple')
  @UseInterceptors(FileInterceptor('files', options))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
  }

  @Post('multiple-fields')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file1', maxCount: 1 },
        { name: 'file2', maxCount: 1 },
      ],
      options
    )
  )
  async uploadMultiFieldFiles(
    @UploadedFiles()
    files: {
      file1: Express.Multer.File[];
      file2: Express.Multer.File[];
    }
  ) {
    console.log(files);
  }
}
