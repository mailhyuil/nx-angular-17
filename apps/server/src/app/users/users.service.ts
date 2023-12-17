import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CrudService } from '../../crud/crud.service';
import { UserTypeMap } from '../../crud/user.type';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService extends CrudService<Prisma.UserDelegate, UserTypeMap> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.user);
  }
}
