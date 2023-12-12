/*
https://docs.nestjs.com/interceptors#interceptors
*/

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import etag from 'etag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class EtagInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const oldEtag = request.headers['if-none-match']; // Get the ETag value from the request headers.

    return next.handle().pipe(
      map((data) => {
        response.header('cache-control', 'no-cache, must-revalidate');
        const currentEtag = etag(JSON.stringify(data), { weak: true }); // Generate the ETag.

        if (oldEtag && oldEtag === currentEtag) {
          response.status(304); // Send a 304 response if the ETags match.
          return null; // Returning null to avoid further processing.
        } else {
          return data; // Proceed with the response.
        }
      })
    );
  }
}
