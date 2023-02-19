import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [WishlistsController],
  providers: [WishlistsService, PrismaService],
})
export class WishlistsModule {}
