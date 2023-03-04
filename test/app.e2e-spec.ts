import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initTestingApp } from './utils/init-app';
import { PrismaService } from 'src/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const init = await initTestingApp(app, prisma);
    app = init.app;
    prisma = init.prisma;
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('KadoKajo API v.0.0.1');
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });
});
