import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';
import { CreateWishlistRequestDto } from './dto/create-wishlist-request.dto';
import { WishlistEntity } from './entities/wishlist.entity';
import { AddPartakerToWishlistRequestDto } from './dto/add-partaker-to-wishlist-request.dto';
import { UpdateWishlistRequestDto } from './dto/update-wishlist-request.dto';
import { UserOnWishlistEntity } from './entities/user-on-wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  create(
    createWishlistRequestDto: CreateWishlistRequestDto,
    userId: number,
  ): Promise<WishlistEntity> {
    return this.prisma.wishlist.create({
      data: {
        ...createWishlistRequestDto,
        users: {
          create: {
            userId,
            isCreator: true,
          },
        },
      },
    });
  }

  findOne(id: number): Promise<WishlistEntity | null> {
    return this.prisma.wishlist.findUnique({ where: { id } });
  }

  findAll(userId: number): Promise<WishlistEntity[]> {
    return this._findMany({
      where: { users: { some: { userId } } },
    });
  }

  update(
    id: number,
    updateWishlistRequestDto: UpdateWishlistRequestDto,
  ): Promise<WishlistEntity> {
    return this.prisma.wishlist.update({
      where: { id },
      data: updateWishlistRequestDto,
    });
  }

  remove(wishlistId: number): Promise<WishlistEntity> {
    return this.prisma.wishlist.delete({ where: { id: wishlistId } });
  }

  getPartakers(wishlistId: number): Promise<UserOnWishlistEntity[]> {
    return this.prisma.usersOnWishlists.findMany({
      where: { wishlistId },
      include: {
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

  async addPartaker(
    wishlistId: number,
    addUserToWishlistDto: AddPartakerToWishlistRequestDto,
  ): Promise<WishlistEntity> {
    const newUser = await this.usersService.findOne(addUserToWishlistDto.email);
    return this.prisma.wishlist.update({
      where: { id: wishlistId },
      data: {
        users: { create: { userId: newUser.id } },
      },
    });
  }

  async validateUserIsPartakerInWishlist(
    wishlistId: number,
    userId: number,
  ): Promise<boolean> {
    const userOnWishlist = await this.prisma.usersOnWishlists.findUnique({
      where: {
        wishlistId_userId: {
          wishlistId,
          userId,
        },
      },
    });
    if (!userOnWishlist) {
      throw new ForbiddenException();
    }
    return true;
  }

  async validateUserIsCreatorOfWishlist(
    wishlistId: number,
    userId: number,
  ): Promise<boolean> {
    const userOnWishlist = await this.prisma.usersOnWishlists.findFirst({
      where: {
        wishlistId,
        userId,
        isCreator: true,
      },
    });
    if (!userOnWishlist) {
      throw new ForbiddenException();
    }
    return true;
  }

  private _findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WishlistWhereUniqueInput;
    where?: Prisma.WishlistWhereInput;
    orderBy?: Prisma.WishlistOrderByWithRelationInput;
  }): Promise<WishlistEntity[]> {
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
