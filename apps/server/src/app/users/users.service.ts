import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, UserDto } from './users.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const found = await this.prisma.user.findMany();
    return plainToInstance(UserDto, found);
  }

  async findByIdOrThrow(id: string) {
    const found = await this.prisma.user
      .findUniqueOrThrow({
        where: { id },
      })
      .catch((e) => {
        throw new NotFoundException('User을 찾을 수 없습니다.');
      });
    return plainToInstance(UserDto, found);
  }

  async findByIdOrNull(id: string) {
    const found = await this.prisma.user.findUnique({
      where: { id },
    });
    return plainToInstance(UserDto, found);
  }

  async create(data: CreateUserDto) {
    const created = await this.prisma.user
      .create({
        data,
      })
      .catch((e) => {
        throw new BadRequestException(e, 'User을 생성할 수 없습니다.');
      });
    return plainToInstance(UserDto, created);
  }

  async update(id: string, data: UpdateUserDto) {
    await this.findByIdOrThrow(id);
    const updated = await this.prisma.user
      .update({
        where: { id },
        data,
      })
      .catch((e) => {
        throw new BadRequestException(e, 'User을 수정할 수 없습니다.');
      });
    return plainToInstance(UserDto, updated);
  }

  async remove(id: string) {
    await this.findByIdOrThrow(id);
    const deleted = await this.prisma.user
      .delete({
        where: { id },
      })
      .catch((e) => {
        throw new BadRequestException(e, 'User을 삭제할 수 없습니다.');
      });
    return deleted;
  }
}
