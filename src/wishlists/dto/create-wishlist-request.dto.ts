import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateWishlistRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ required: false })
  description?: string;
}
