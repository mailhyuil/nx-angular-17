import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';

import { Request, Response } from 'express';
import ffmpeg from 'fluent-ffmpeg';
import fs, { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
@Controller()
export class AppController {
  @Get()
  getFile(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): StreamableFile {
    const filepath = join(__dirname, '../../../sample.mp4');
    const file = createReadStream(filepath);
    const stat = fs.statSync(filepath);
    const fileSize = stat.size;
    const range = req.headers.range; // bytes=0-

    if (!range) {
      res.set({
        'Accept-Ranges': 'bytes', // 구간 스킵 가능 (프로그래스바를 클릭해서 넘어갈 수 있게 해줌)
        'Content-Type': 'video/mp4',
        'Content-Length': fileSize - 1,
      });
      return new StreamableFile(file);
    }

    const MAX_CHUNK_SIZE = 1000 * 1000 * 50; // 50MB

    // range헤더 파싱
    const parts = range.replace(/bytes=/, '').split('-');
    // 재생 구간 설정
    const start = Number(parts[0]);
    const _end = parts[1] ? Number(parts[1]) : fileSize - 1;
    const end = Math.min(_end, start + MAX_CHUNK_SIZE - 1);

    const header = {
      'Content-Range': `bytes ${start}-${end}/${fileSize - 1}`,
      'Accept-Ranges': 'bytes',
      'Content-Type': 'video/mp4',
      'Content-Length': end - start + 1,
    };
    console.log(start);
    console.log(end);
    console.log(fileSize);
    res.writeHead(206, header);
    const readStream = fs.createReadStream(filepath, { start, end });
    return new StreamableFile(readStream);
  }

  @Post()
  uploadFile(@Req() req: Request) {
    const outputPath = __dirname;
    const ws = createWriteStream(join(outputPath, 'asdf.mp4'));
    ws.on('close', () => {
      console.log('WriteStream closed');
      // ffmpeg transcoding start
      setTimeout(() => {
        ffmpeg()
          .input(join(outputPath, 'asdf.mp4'))
          .outputOptions([
            '-vf scale=100:100',
            '-movflags frag_keyframe+empty_moov', //
            '-frag_duration 1000', //
          ])
          .toFormat('mp4')
          .on('progress', (progress) => {
            console.log(`Processing: ${progress.percent || 0}% done`);
          })
          .on('end', () => {
            console.log('해상도 변환이 완료되었습니다.');
          })
          .on('error', (err) => {
            console.error('오류 발생:', err);
          })
          .save(join(outputPath, 'sample.mp4'));
      }, 3000);
    });
    ws.on('finish', () => {
      console.log('WriteStream finished');
    });
    // busboy
    req.pipe(req.busboy);
    req.busboy.on('file', function (name, file) {
      file
        .on('data', (data) => {
          console.log(data); // stream data
          ws.write(data);
        })
        .on('end', () => {
          console.log('busboy ended');
          ws.end();
          ws.close();
        })
        .on('error', (err) => {
          console.log('busboy error : ', err);
        });
    });
  }
}
