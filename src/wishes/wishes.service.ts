import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateWishRequestDto } from './dto/create-wish-request.dto';
import { UpdateWishRequestDto } from './dto/update-wish-request.dto';
import { WishEntity } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    createWishRequestDto: CreateWishRequestDto,
    wishlistId: number,
    creatorId: number,
  ): Promise<WishEntity> {
    return this.prisma.wish.create({
      data: {
        ...createWishRequestDto,
        creatorId,
        wishlist: {
          connect: { id: wishlistId },
        },
      },
    });
  }

  findAll(wishlistId: number): Promise<WishEntity[]> {
    return this._findMany({
      where: {
        wishlistId,
      },
    });
  }

  findOne(id: number): Promise<WishEntity> {
    return this.prisma.wish.findUnique({ where: { id } });
  }

  update(
    id: number,
    updateWishRequestDto: UpdateWishRequestDto,
  ): Promise<WishEntity> {
    return this.prisma.wish.update({
      where: { id },
      data: updateWishRequestDto,
    });
  }

  remove(id: number): Promise<WishEntity> {
    return this.prisma.wish.delete({ where: { id } });
  }

  async validateUserIsCreatorOfWish(
    wishId: number,
    userId: number,
  ): Promise<boolean> {
    const wishlist = await this.prisma.wish.findFirst({
      where: {
        id: wishId,
        creatorId: userId,
      },
    });
    if (!wishlist) {
      throw new ForbiddenException();
    }
    return true;
  }

  private _findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WishWhereUniqueInput;
    where?: Prisma.WishWhereInput;
    orderBy?: Prisma.WishOrderByWithRelationInput;
  }): Promise<WishEntity[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.wish.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
