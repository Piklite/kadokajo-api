import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  password: string;
}
