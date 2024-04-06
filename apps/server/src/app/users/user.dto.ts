import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { AddressDTO } from '../address/address.dto';

@Exclude()
export class UserDTO {
  @Expose()
  @ApiProperty()
  id: string;
  @Expose()
  @ApiProperty()
  username: string;
  @Expose()
  @ApiProperty()
  password: string;
  @Expose()
  @ApiProperty({
    type: () => AddressDTO,
  })
  address: AddressDTO;
  @Expose()
  @ApiProperty({
    type: 'Date',
  })
  createdAt: Date;
  @Expose()
  @ApiProperty({
    type: 'Date',
  })
  updatedAt: Date;
  @Expose()
  @ApiProperty({
    type: 'Date',
  })
  blockedAt: Date;
  @Expose()
  @ApiProperty({
    type: 'Date',
  })
  deletedAt: Date;
}

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
