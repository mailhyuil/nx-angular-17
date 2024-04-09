import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomFileInterceptor } from './file.interceptor';

export function FileUpload(fileKey: string) {
  return applyDecorators(
    SetMetadata('fileKey', fileKey),
    UseInterceptors(FileInterceptor(fileKey), CustomFileInterceptor)
  );
}
