import { ApiProperty } from '@nestjs/swagger';
import { Wish } from '@prisma/client';

export class WishEntity implements Wish {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string;

  @ApiProperty()
  wishlistId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  creatorId: number;
}
