import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WishlistsModule } from './wishlists/wishlists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    WishlistsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
