/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: Function) {
    res.cookie('XSRF-TOKEN', req['csrfToken']());
    next();
  }
}
