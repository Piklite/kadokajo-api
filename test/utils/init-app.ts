import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { PrismaClientExceptionFilter } from '../../src/prisma-client-exception.filter';
import { PrismaService } from '../../src/prisma.service';

export async function initTestingApp(
  app: INestApplication,
  prisma: PrismaService,
): Promise<{
  app: INestApplication;
  prisma: PrismaService;
}> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  prisma = moduleRef.get(PrismaService);
  app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.init();
  return {
    app,
    prisma,
  };
}
