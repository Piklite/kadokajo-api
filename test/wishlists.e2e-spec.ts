import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { access_token, loginUser1 } from './utils/auth';

describe('Wishlists', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    await loginUser1(app.getHttpServer());
  });

  it('/GET wishilists', () => {
    return request(app.getHttpServer())
      .get('/wishlists')
      .set('Authorization', 'bearer ' + access_token)
      .expect(200)
      .expect([
        {
          id: 1,
          title: 'Wishlist #1',
          description: 'First wishlist for user User1',
          createdAt: '2023-02-18T11:04:22.499Z',
        },
        {
          id: 2,
          title: 'Wishlist #2',
          description: 'Updated description',
          createdAt: '2023-02-18T11:04:22.505Z',
        },
      ]);
  });

  afterAll(async () => {
    await app.close();
  });
});
