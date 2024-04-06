import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { UserDTO } from '../users/user.dto';

@Exclude()
export class AddressDTO {
  @Expose()
  @ApiProperty()
  id: string;
  @Expose()
  @ApiProperty({
    type: () => UserDTO,
  })
  user: UserDTO;
  @Expose()
  @ApiProperty()
  street: string;
  @Expose()
  @ApiProperty()
  city: string;
  @Expose()
  @ApiProperty()
  zip: string;
}

export class CreateAddressDTO {
  @ApiProperty()
  @IsNotEmpty()
  street: string;
  @ApiProperty()
  @IsNotEmpty()
  city: string;
  @ApiProperty()
  @IsNotEmpty()
  zip: string;
}

export class UpdateAddressDTO extends PartialType(CreateAddressDTO) {}
