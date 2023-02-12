import { Controller, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  @Get('a')
  getTitle(): string {
    return 'KadoKajo API v.0.0.1';
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  geta(): string {
    return 'KadoKajo API v.0.0.1';
  }
}
