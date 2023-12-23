import { CreateUserDto, UpdateUserDto, UserDto } from '@hyuil/libs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { UserService } from './users.service';
@ApiTags('User')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '모든 User 목록 조회',
  })
  @ApiResponse({
    type: UserDto,
    isArray: true,
  })
  async findAll() {
    const found = await this.userService.findAll({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return plainToInstance(UserDto, found);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'User을 id로 조회',
  })
  @ApiResponse({
    type: UserDto,
  })
  async findById(@Param('id') id: string) {
    return await this.userService.findById({
      where: { id },
    });
  }

  @Post()
  @ApiOperation({
    summary: 'User 생성',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create({
      data: body,
    });
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'User 수정',
  })
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.update({
      where: { id },
      data: body,
    });
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'User 삭제',
  })
  async remove(@Param('id') id: string) {
    return await this.userService.delete({
      where: { id },
    });
  }
}
