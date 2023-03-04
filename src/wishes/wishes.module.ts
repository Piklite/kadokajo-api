import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { PrismaService } from '../prisma.service';
import { WishlistsModule } from '../wishlists/wishlists.module';
import { UsersModule } from '../users/users.module';
import { WishlistsService } from '../wishlists/wishlists.service';

@Module({
  controllers: [WishesController],
  providers: [WishesService, WishlistsService, PrismaService],
  imports: [WishlistsModule, UsersModule],
})
export class WishesModule {}
