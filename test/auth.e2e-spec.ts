import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { access_token, loginUser1 } from './utils/auth';

describe('Auth', () => {
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

  describe('/POST login', () => {
    it('should authenticate', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'user1@kado.com',
          password: '123',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.access_token).toBeTruthy();
        });
    });
    it('should throw 401', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'wrong_user',
          password: '123',
        })
        .expect(401);
    });
    it('should throw 401', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'user1@kado.com',
          password: 'wrong_password',
        })
        .expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
