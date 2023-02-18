import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Wishlist } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createWishlistDto: CreateWishlistDto,
    userId: number,
  ): Promise<Wishlist> {
    return this.prisma.wishlist.create({
      data: {
        ...createWishlistDto,
        users: {
          create: {
            userId,
            isCreator: true,
          },
        },
      },
    });
  }

  async findOne(wishlistId: number, userId: number): Promise<Wishlist | null> {
    const wishlist = await this.checkIfUserIsPartaker(wishlistId, userId);
    return wishlist;
  }

  async findAll(userId: number): Promise<Wishlist[]> {
    return this._findMany({
      where: { users: { some: { userId } } },
    });
  }

  async update(
    wishlistId: number,
    data: Prisma.WishlistUpdateInput,
    userId: number,
  ): Promise<Wishlist> {
    await this.checkIfUserIsCreator(wishlistId, userId);
    return this.prisma.wishlist.update({ where: { id: wishlistId }, data });
  }

  async delete(wishlistId: number, userId: number): Promise<Wishlist> {
    await this.checkIfUserIsCreator(wishlistId, userId);
    return this.prisma.wishlist.delete({ where: { id: wishlistId } });
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

  private async checkIfUserIsPartaker(
    wishlistId: number,
    userId: number,
  ): Promise<Wishlist> {
    const wishlist = await this.prisma.wishlist.findFirst({
      where: {
        id: wishlistId,
        users: { some: { userId } },
      },
    });
    if (!wishlist) {
      throw new ForbiddenException();
    }
    return wishlist;
  }

  private async checkIfUserIsCreator(
    wishlistId: number,
    userId: number,
  ): Promise<Wishlist> {
    const wishlist = await this.prisma.wishlist.findFirst({
      where: {
        id: wishlistId,
        users: {
          some: {
            userId,
            isCreator: true,
          },
        },
      },
    });
    if (!wishlist) {
      throw new ForbiddenException();
    }
    return wishlist;
  }
}
