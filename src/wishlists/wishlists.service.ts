import { Injectable } from '@nestjs/common';
import { Prisma, Wishlist } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(private prisma: PrismaService) {}

  create(
    createWishlistDto: CreateWishlistDto,
    ownerId: number,
  ): Promise<Wishlist> {
    return this.prisma.wishlist.create({
      data: {
        ...createWishlistDto,
        createdBy: {
          connect: { id: ownerId },
        },
        partakers: {
          create: {
            userId: ownerId,
          },
        },
      },
    });
  }

  findOne(
    wishlistWhereUniqueInput: Prisma.WishlistWhereUniqueInput,
  ): Promise<Wishlist | null> {
    return this.prisma.wishlist.findUnique({
      where: wishlistWhereUniqueInput,
      include: {
        createdBy: true,
        partakers: {
          select: {
            userId: true,
          },
        },
      },
    });
  }

  findOwned(userId: number): Promise<Wishlist[]> {
    return this._findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  findOwnedAndPartakings(userId: number): Promise<Wishlist[]> {
    return this._findMany({
      where: {
        OR: [
          { ownerId: userId },
          {
            partakers: { some: { userId: userId } },
          },
        ],
      },
    });
  }

  update(id: number, data: Prisma.WishlistUpdateInput): Promise<Wishlist> {
    return this.prisma.wishlist.update({ where: { id }, data });
  }

  delete(id: number): Promise<Wishlist> {
    return this.prisma.wishlist.delete({ where: { id } });
  }

  private _findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WishlistWhereUniqueInput;
    where?: Prisma.WishlistWhereInput;
    orderBy?: Prisma.WishlistOrderByWithRelationInput;
  }): Promise<Wishlist[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.wishlist.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
