import { Controller, Get, Req, Res, StreamableFile } from '@nestjs/common';

import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Etag } from '../decorators/etag.decorator';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(@Res() res: Response, @Req() req: Request) {
    return 999;
  }

  @Etag()
  @Get('stream')
  getStream(@Res({ passthrough: true }) res: Response) {
    const start = 0;
    const end = 3000000;
    // const end = 158008374;
    const chunksize = end - start + 1;

    const file = createReadStream(join(__dirname, 'assets', 'sample.mp4'), {
      start,
      end,
    });
    res.header('Content-Range', `bytes ${start}-${end}/${chunksize}`);
    res.header('Accept-Ranges', 'bytes');
    res.header('Content-Length', chunksize + '');
    res.header('Content-Type', 'video/mp4');
    return new StreamableFile(file, {
      type: 'video/mp4',
    });
  }
}
