import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { PrismaService } from '../prisma.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [WishlistsController],
  providers: [WishlistsService, PrismaService],
  imports: [UsersModule],
})
export class WishlistsModule {}
