import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { access_token, loginTestUser } from './utils/auth';
import { initTestingApp } from './utils/init-app';
import { PrismaService } from '../src/prisma.service';

describe('Wishlists', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const init = await initTestingApp(app, prisma);
    app = init.app;
    prisma = init.prisma;
    await loginTestUser(app.getHttpServer());
  });

  describe('[POST] /wishlists', () => {
    describe('Title validation', () => {
      xit('should throw if empty', () => {});
      xit('should throw if less than 5 characters', () => {});
      xit('should throw if more than 50 characters', () => {});
    });
    describe('Description validation', () => {
      xit('should throw if less than 5 characters', () => {});
      xit('should throw if more than 50 characters', () => {});
    });
    describe('New wishlist validation', () => {
      xit('should create a wishlist', () => {});
      xit('should save the title', () => {});
      xit('should save the description', () => {});
      xit('should save the creation date', () => {});
      xit('should set the user as creator', () => {});
    });
  });

  describe('[GET] /wishlists', () => {
    it('should return the visible wishlists of the user', () => {
      return request(app.getHttpServer())
        .get('/wishlists')
        .set('Authorization', 'bearer ' + access_token)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(1);
          expect(res.body[0]).toHaveProperty('title', 'JC birthday');
          expect(res.body[0]).toHaveProperty(
            'description',
            "John Connor's birthday list",
          );
        });
    });
    xit('should not return any wishlist', () => {});
  });

  describe('[GET] /wishlists/:wishlistId', () => {});

  describe('[PATCH] /wishlists/:wishlistId', () => {});

  describe('[DELETE] /wishlists/:wishlistId', () => {});

  describe('[GET] /wishlists/partakers', () => {});

  describe('[POST] /wishlists/partakers', () => {});

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });
});
