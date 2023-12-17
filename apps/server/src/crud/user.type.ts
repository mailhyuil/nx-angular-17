import { Prisma } from '@prisma/client';
import { CrudTypeMap } from './crud.type';

export class UserTypeMap implements CrudTypeMap {
  aggregate: Prisma.UserAggregateArgs;
  count: Prisma.UserCountArgs;
  create: Prisma.UserCreateArgs;
  delete: Prisma.UserDeleteArgs;
  deleteMany: Prisma.UserDeleteManyArgs;
  findFirst: Prisma.UserFindFirstArgs;
  findMany: Prisma.UserFindManyArgs;
  findUnique: Prisma.UserFindUniqueArgs;
  update: Prisma.UserUpdateArgs;
  updateMany: Prisma.UserUpdateManyArgs;
  upsert: Prisma.UserUpsertArgs;
}
