import { Controller, Get, StreamableFile } from '@nestjs/common';

import { createReadStream } from 'fs';
import { join } from 'path';
import { Etag } from '../decorators/etag.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Etag()
  @Get()
  getData() {
    return 999;
  }

  @Etag()
  @Get('stream')
  getStream() {
    const file = createReadStream(join(__dirname, 'assets', 'hello.txt'));
    return new StreamableFile(file);
  }
}
