import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getTitle(): string {
    return 'KadoKajo API v.0.0.1';
  }
}
