import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
@Injectable()
export class CustomFileInterceptor implements NestInterceptor {
  constructor() {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    console.log(req.body);
    return next.handle().pipe();
  }
}
