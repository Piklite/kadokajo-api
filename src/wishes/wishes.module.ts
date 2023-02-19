import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [WishesController],
  providers: [WishesService, PrismaService],
})
export class WishesModule {}
