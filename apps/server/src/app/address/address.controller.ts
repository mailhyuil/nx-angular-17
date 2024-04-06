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
import { AddressDTO, CreateAddressDTO, UpdateAddressDTO } from './address.dto';
import { AddressService } from './address.service';

@ApiTags('Address')
@Controller({ path: 'addresss', version: '1' })
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @ApiOperation({
    summary: '모든 Address 목록 조회',
  })
  @ApiOkResponse({ type: [AddressDTO] })
  async findAll() {
    return await this.addressService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Address id로 조회',
  })
  @ApiOkResponse({ type: AddressDTO })
  async findById(@Param('id') id: string) {
    return await this.addressService.findByIdOrThrow(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Address 생성',
  })
  @ApiBody({ type: CreateAddressDTO })
  @ApiCreatedResponse({ type: AddressDTO })
  async create(@Body() body: CreateAddressDTO) {
    return await this.addressService.create(body);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Address 수정',
  })
  @ApiBody({ type: UpdateAddressDTO })
  @ApiOkResponse({ type: AddressDTO })
  async update(@Param('id') id: string, @Body() body: UpdateAddressDTO) {
    return await this.addressService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Address 삭제',
  })
  @ApiNoContentResponse()
  async delete(@Param('id') id: string) {
    await this.addressService.delete(id);
  }
}
