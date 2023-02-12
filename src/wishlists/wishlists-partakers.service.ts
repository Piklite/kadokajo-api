import { Injectable } from '@nestjs/common';
import { Prisma, Wishlist } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class WishlistsPartakersService {
  constructor(private prisma: PrismaService) {}

  findWishlistsByUserId(userId: number): Promise<{ wishlist?: Wishlist }[]> {
    return this.findMany({
      where: { userId },
      select: { wishlist: true },
    });
  }
  findPartakersByWishlistId(
    wishlistId: number,
  ): Promise<{ user?: UserEntity }[]> {
    return this.findMany({
      where: { wishlistId },
      select: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            password: false,
          },
        },
      },
    });
  }

  findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WishlistPartakersWhereUniqueInput;
    where?: Prisma.WishlistPartakersWhereInput;
    orderBy?: Prisma.WishlistPartakersOrderByWithRelationInput;
    select?: Prisma.WishlistPartakersSelect;
  }): Promise<
    {
      user?: UserEntity;
      userId?: number;
      wishlist?: Wishlist;
      wishlistId?: number;
    }[]
  > {
    const { skip, take, cursor, where, orderBy, select } = params;
    return this.prisma.wishlistPartakers.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select,
    });
  }
}
