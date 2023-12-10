import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { EtagInterceptor } from '../interceptors/etag.interceptor';

export function Etag() {
  return applyDecorators(UseInterceptors(EtagInterceptor));
}
