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
import { options } from './multer-option';

@Controller('file')
export class FileController {
  @Post()
  @UseInterceptors(FileInterceptor('file', options))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
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
