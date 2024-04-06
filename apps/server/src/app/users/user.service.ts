import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'apps/server/src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './user.dto';

const findManyInclude: Prisma.UserInclude = {};

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const found = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: findManyInclude,
    });
    return plainToInstance(UserDTO, found);
  }

  async findByIdOrThrow(id: string) {
    const found = await this.prisma.user
      .findUniqueOrThrow({
        where: { id },
      })
      .catch((e) => {
        console.error(e);
        throw new NotFoundException('User을 찾을 수 없습니다.');
      });
    return plainToInstance(UserDTO, found);
  }

  async create(data: CreateUserDTO) {
    const created = await this.prisma.user.create({ data }).catch((e) => {
      console.error(e);
      throw new BadRequestException('User을 생성할 수 없습니다.');
    });
    return plainToInstance(UserDTO, created);
  }

  async update(id: string, data: UpdateUserDTO) {
    await this.findByIdOrThrow(id);
    const updated = await this.prisma.user
      .update({
        where: { id },
        data,
      })
      .catch((e) => {
        console.error(e);
        throw new BadRequestException(e, 'User을 수정할 수 없습니다.');
      });
    return plainToInstance(UserDTO, updated);
  }

  async delete(id: string) {
    await this.findByIdOrThrow(id);
    const deleted = await this.prisma.user
      .delete({
        where: { id },
      })
      .catch((e) => {
        console.error(e);
        throw new BadRequestException(e, 'User을 삭제할 수 없습니다.');
      });
    return deleted;
  }
}
