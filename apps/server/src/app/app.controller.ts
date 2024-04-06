import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';

import { Request, Response } from 'express';
import fs, { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const filepath = join(process.cwd(), 'sample.mp4');
    const file = createReadStream(filepath);
    // 이하 추가된 내용입니다.
    const stat = fs.statSync(filepath);
    res.set({
      'Content-Type': 'video/mp4',
      'Content-Disposition': 'attachment; filename="sample.mp4"',
      'Content-Length': stat.size,
    });
    return new StreamableFile(file);
  }

  @Post()
  uploadFile(@Req() req: Request) {
    // write file
    const ws = createWriteStream(join(__dirname, '../../..', 'sample.mp4'));
    ws.on('finish', () => {
      console.log('File Written');
      ws.close();
    });
    // busboy
    req.pipe(req.busboy);
    req.busboy.on('file', function (name, file, info) {
      const { filename, encoding, mimeType } = info;
      file.on('data', (data) => {
        console.log(data); // stream data
        // write file in /assets
        ws.write(data);
      });
      file.on('end', () => {
        console.log('File [' + filename + '] Finished');
      });
      file.on('error', (err) => {
        console.log('Error', err);
      });
    });
  }
}
