import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'apps/server/src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { AddressDTO, CreateAddressDTO, UpdateAddressDTO } from './address.dto';

const findManyInclude: Prisma.AddressInclude = {};

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const found = await this.prisma.address.findMany({
      include: findManyInclude,
    });
    return plainToInstance(AddressDTO, found);
  }

  async findByIdOrThrow(id: string) {
    const found = await this.prisma.address
      .findUniqueOrThrow({
        where: { id },
      })
      .catch((e) => {
        console.error(e);
        throw new NotFoundException('Address을 찾을 수 없습니다.');
      });
    return plainToInstance(AddressDTO, found);
  }

  async create(data: CreateAddressDTO) {
    const created = await this.prisma.address.create({ data }).catch((e) => {
      console.error(e);
      throw new BadRequestException('Address을 생성할 수 없습니다.');
    });
    return plainToInstance(AddressDTO, created);
  }

  async update(id: string, data: UpdateAddressDTO) {
    await this.findByIdOrThrow(id);
    const updated = await this.prisma.address
      .update({
        where: { id },
        data,
      })
      .catch((e) => {
        console.error(e);
        throw new BadRequestException(e, 'Address을 수정할 수 없습니다.');
      });
    return plainToInstance(AddressDTO, updated);
  }

  async delete(id: string) {
    await this.findByIdOrThrow(id);
    const deleted = await this.prisma.address
      .delete({
        where: { id },
      })
      .catch((e) => {
        console.error(e);
        throw new BadRequestException(e, 'Address을 삭제할 수 없습니다.');
      });
    return deleted;
  }
}
