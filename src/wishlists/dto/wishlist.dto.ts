import { ApiProperty } from '@nestjs/swagger';
import { WishlistEntity } from '../entities/wishlist.entity';

export class WishlistDto implements WishlistEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string;

  @ApiProperty()
  createdAt: Date;
}
