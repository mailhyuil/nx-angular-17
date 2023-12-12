/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RealtimeService {
  private readonly dataSubject = new Subject<string>();
  readonly data$ = this.dataSubject.asObservable();

  constructor(private readonly prisma: PrismaService) {}

  async update(str: string) {
    this.dataSubject.next(str);
  }
}
