import { ApiProperty } from '@nestjs/swagger';
import { Wishlist } from '@prisma/client';

export class WishlistEntity implements Wishlist {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string;

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  createdAt: Date;
}
