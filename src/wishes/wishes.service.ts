import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishEntity } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    createWishDto: CreateWishDto,
    wishlistId: number,
    creatorId: number,
  ): Promise<WishEntity> {
    return this.prisma.wish.create({
      data: {
        ...createWishDto,
        creatorId,
        wishlist: {
          connect: { id: wishlistId },
        },
      },
    });
  }

  findAll(wishlistId: number): Promise<WishEntity[]> {
    return this.prisma.wish.findMany({
      where: {
        wishlistId,
      },
    });
  }

  findOne(id: number): Promise<WishEntity> {
    return this.prisma.wish.findUnique({ where: { id } });
  }

  update(id: number, updateWishDto: UpdateWishDto): Promise<WishEntity> {
    return this.prisma.wish.update({ where: { id }, data: updateWishDto });
  }

  remove(id: number): Promise<WishEntity> {
    return this.prisma.wish.delete({ where: { id } });
  }
}
