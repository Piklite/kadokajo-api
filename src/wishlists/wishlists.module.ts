import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { PrismaService } from 'src/prisma.service';
// import { WishlistsPartakersService } from './wishlists-partakers.service';

@Module({
  controllers: [WishlistsController],
  providers: [WishlistsService /*, WishlistsPartakersService,*/, PrismaService],
})
export class WishlistsModule {}
