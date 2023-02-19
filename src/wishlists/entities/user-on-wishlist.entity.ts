import { ApiProperty } from '@nestjs/swagger';
import { UsersOnWishlists } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';
import { WishlistDto } from '../dto/wishlist.dto';

export class UserOnWishlistEntity implements UsersOnWishlists {
  @ApiProperty()
  wishlistId: number;

  @ApiProperty()
  wishlist?: WishlistDto;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  user?: UserEntity;

  @ApiProperty()
  isCreator: boolean;
}
