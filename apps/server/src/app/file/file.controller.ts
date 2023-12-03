/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post, UploadedFile } from '@nestjs/common';

@Controller({ path: 'file' })
export class FileController {
  @Get(':id')
  download() {}

  @Post()
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
