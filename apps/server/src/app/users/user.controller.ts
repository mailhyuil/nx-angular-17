import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '모든 User 목록 조회',
  })
  @ApiOkResponse({ type: [UserDTO] })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'User id로 조회',
  })
  @ApiOkResponse({ type: UserDTO })
  async findById(@Param('id') id: string) {
    return await this.userService.findByIdOrThrow(id);
  }

  @Post()
  @ApiOperation({
    summary: 'User 생성',
  })
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({ type: UserDTO })
  async create(@Body() body: CreateUserDTO) {
    return await this.userService.create(body);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'User 수정',
  })
  @ApiBody({ type: UpdateUserDTO })
  @ApiOkResponse({ type: UserDTO })
  async update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'User 삭제',
  })
  @ApiNoContentResponse()
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
