import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import etag from 'etag';
import { CreateUserDto, UpdateUserDto, UserDto } from './users.dto';
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
  @Header('cache-control', 'no-cache')
  async findAll(@Headers('if-none-match') oldEtag?: string, @Res() res?: any) {
    const data = await this.userService.findAll();
    const currentEtag = etag(JSON.stringify(data), { weak: true }); // Generate the ETag.
    if (oldEtag && oldEtag === currentEtag) {
      console.log('ETag matches. Sending 304 response.');
      res.status(HttpStatus.NOT_MODIFIED).send();
    } else {
      console.log('etag does not match. Proceeding with the response.');
      res.status(HttpStatus.OK).send(data);
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'User을 id로 조회',
  })
  @ApiResponse({
    type: UserDto,
  })
  async findById(@Param('id') id: string) {
    return await this.userService.findByIdOrThrow(id);
  }

  @Post()
  @ApiOperation({
    summary: 'User 생성',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'User 수정',
  })
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'User 삭제',
  })
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
