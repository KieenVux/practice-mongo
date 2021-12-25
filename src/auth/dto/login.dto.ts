import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class LoginRequest {
  @ApiProperty()
  @Length(3, 30)
  email: string;

  @ApiProperty()
  @Length(6, 30)
  password: string;
}
