import { PartialType } from '@nestjs/swagger';
import { CreateWishlistRequestDto } from './create-wishlist-request.dto';

export class UpdateWishlistRequestDto extends PartialType(
  CreateWishlistRequestDto,
) {}
