import { Wishlist } from '@prisma/client';

export class WishlistEntity implements Wishlist {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}
