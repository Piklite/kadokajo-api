import { Controller, Request, Post, UseGuards, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Prisma } from '@prisma/client';
import { Body } from '@nestjs/common/decorators';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/create-account')
  async createAccount(@Body() data: Prisma.UserCreateInput) {
    return this.authService.createAccount(
      Prisma.validator<Prisma.UserCreateInput>()({ ...data }),
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete-account')
  async deleteAccount(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.deleteAccount(email, password);
  }
}
