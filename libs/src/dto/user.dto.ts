import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
@Exclude()
export class UserDto {
  @ApiProperty()
  @Expose()
  id: string;
  @ApiProperty()
  @Expose()
  username: string;
  @ApiProperty()
  @Expose()
  password: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: '유저네임을 입력해주세요.' })
  username: string;
  @ApiProperty()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
