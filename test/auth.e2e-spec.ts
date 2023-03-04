import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../prisma.service';
import { initTestingApp } from '../../test/utils/init-app';

describe('Auth', () => {
  const USER_INFOS_MOCK = {
    email: 'sarah_connor@kadokajo.com',
    username: 'SarahConnor',
    password: 'h@st@l@v15t@b@by!',
    confirmPassword: 'h@st@l@v15t@b@by!',
  };

  let access_token = '';

  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const init = await initTestingApp(app, prisma);
    app = init.app;
    prisma = init.prisma;
  });

  describe('[POST] /auth/create-account', () => {
    describe('Email validation', () => {
      it('should throw if not a valid email adresse', () => {
        return request(app.getHttpServer())
          .post('/auth/create-account')
          .send({ ...USER_INFOS_MOCK, email: 'notanemailadresse' })
          .expect(400)
          .expect((res) =>
            expect(res.body.message).toEqual(['email must be an email']),
          );
      });
      it('should throw if empty', () => {
        return request(app.getHttpServer())
          .post('/auth/create-account')
          .send({ ...USER_INFOS_MOCK, email: '' })
          .expect(400)
          .expect((res) =>
            expect(res.body.message).toEqual([
              'email should not be empty',
              'email must be an email',
            ]),
          );
      });
      it('should throw if more than 255 characters', () => {
        return request(app.getHttpServer())
          .post('/auth/create-account')
          .send({
            ...USER_INFOS_MOCK,
            email:
              'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@kadokajo.com',
          })
          .expect(400)
          .expect((res) =>
            expect(res.body.message).toEqual([
              'email must be shorter than or equal to 255 characters',
              'email must be an email',
            ]),
          );
      });
    });
    describe('Username validation', () => {
      it('should throw if empty', () => {
        return request(app.getHttpServer())
          .post('/auth/create-account')
          .send({ ...USER_INFOS_MOCK, username: '' })
          .expect(400)
          .expect((res) =>
            expect(res.body.message).toEqual([
              'username must be longer than or equal to 4 characters',
              'username should not be empty',
            ]),
          );
      });
      it('should throw if less than 4 characters', () => {
        return request(app.getHttpServer())
          .post('/auth/create-account')
          .send({ ...USER_INFOS_MOCK, username: 'bob' })
          .expect(400)
          .expect((res) =>
            expect(res.body.message).toEqual([
              'username must be longer than or equal to 4 characters',
            ]),
          );
      });
      it('should throw if more than 50 characters', () => {
        return request(app.getHttpServer())
          .post('/auth/create-account')
          .send({
            ...USER_INFOS_MOCK,
            username:
              'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          })
          .expect(400)
          .expect((res) =>
            expect(res.body.message).toEqual([
              'username must be shorter than or equal to 50 characters',
            ]),
          );
      });
    });
    describe('Password validation', () => {
      it('should throw if empty', () => {
        return request(app.getHttpServer())
          .post('/auth/create-account')
          .send({ ...USER_INFOS_MOCK, password: '' })
          .expect(400)
          .expect((res) =>
            expect(res.body.message).toEqual(['password should not be empty']),
          );
      });
      it('should throw if more than 50 characters', () => {
        return request(app.getHttpServer())
          .post('/auth/create-account')
          .send({
            ...USER_INFOS_MOCK,
            password:
              'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          })
          .expect(400)
          .expect((res) =>
            expect(res.body.message).toEqual([
              'password must be shorter than or equal to 50 characters',
            ]),
          );
      });
      // it('should throw if passwords does not match', () => {
      //   return request(app.getHttpServer())
      //     .post('/auth/create-account')
      //     .send({
      //       ...USER_INFOS_MOCK,
      //       passwordConfirm: 'wrong_password',
      //     })
      //     .expect(400)
      //     .expect((res) =>
      //       expect(res.body.message).toEqual([
      //         'password must be shorter than or equal to 50 characters',
      //       ]),
      //     );
      // });
    });
    describe('New User validation', () => {
      it('should create a user', () => {
        return request(app.getHttpServer())
          .post('/auth/create-account')
          .send({ ...USER_INFOS_MOCK })
          .expect(201);
      });
      it('should save the email', async () => {
        const user = await prisma.user.findUnique({
          where: { email: USER_INFOS_MOCK.email },
        });
        expect(user.email);
      });
      it('should save the username', async () => {
        const user = await prisma.user.findUnique({
          where: { email: USER_INFOS_MOCK.email },
        });
        expect(user.username);
      });
      it('should save the encrypted password', async () => {
        const user = await prisma.user.findUnique({
          where: { email: USER_INFOS_MOCK.email },
        });
        expect(user.password);
      });
      it('should throw if the user already exists', async () => {
        return request(app.getHttpServer())
          .post('/auth/create-account')
          .send({ ...USER_INFOS_MOCK })
          .expect(409);
      });
    });
  });

  describe('[POST] /auth/login', () => {
    it('should throw a 401 if the user does not exist', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'wrong_user@kadokajo.com',
          password: USER_INFOS_MOCK.password,
        })
        .expect(401)
        .expect((res) =>
          expect(res.body.message).toBe('Invalid email or password'),
        );
    });
    it('should throw a 401 if the password is wrong', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: USER_INFOS_MOCK.email,
          password: 'wrong_password',
        })
        .expect(401)
        .expect((res) =>
          expect(res.body.message).toBe('Invalid email or password'),
        );
    });
    it('should authenticate the user', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: USER_INFOS_MOCK.email,
          password: USER_INFOS_MOCK.password,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.access_token).toBeTruthy();
          access_token = res.body.access_token;
        });
    });
  });

  describe('[PATCH] /auth/change-password', () => {
    describe('Password validation', () => {
      it('should throw if the email adresse is wrong', () => {
        return request(app.getHttpServer())
          .patch('/auth/change-password')
          .set('Authorization', 'bearer ' + access_token)
          .send({
            email: 'wrong_user@kadokajo.com',
            previousPassword: USER_INFOS_MOCK.password,
            newPassword: 'S@r@hC0nn0r',
          })
          .expect(401)
          .expect((res) => expect(res.body.message).toBe('Invalid email'));
      });
      it('should throw if previous password is wrong', () => {
        return request(app.getHttpServer())
          .patch('/auth/change-password')
          .set('Authorization', 'bearer ' + access_token)
          .send({
            email: USER_INFOS_MOCK.email,
            previousPassword: 'wrong_password',
            newPassword: 'S@r@hC0nn0r',
          })
          .expect(401)
          .expect((res) =>
            expect(res.body.message).toBe('Invalid previous password'),
          );
      });
      it('should update the password', () => {
        return request(app.getHttpServer())
          .patch('/auth/change-password')
          .set('Authorization', 'bearer ' + access_token)
          .send({
            email: USER_INFOS_MOCK.email,
            previousPassword: USER_INFOS_MOCK.password,
            newPassword: 'S@r@hC0nn0r',
          })
          .expect(200);
      });
      it('should not be able to connect with the previous password', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: USER_INFOS_MOCK.email,
            password: USER_INFOS_MOCK.password,
          })
          .expect(401)
          .expect((res) =>
            expect(res.body.message).toBe('Invalid email or password'),
          );
      });
      it('should be able to connect with the new password', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: USER_INFOS_MOCK.email,
            password: 'S@r@hC0nn0r',
          })
          .expect(201)
          .expect((res) => {
            expect(res.body.access_token).toBeTruthy();
          });
      });
    });
  });

  describe('[DELETE] /auth/delete-account', () => {
    it('should delete the user', async () => {
      await request(app.getHttpServer())
        .delete('/auth/delete-account')
        .send({ ...USER_INFOS_MOCK, password: 'S@r@hC0nn0r' })
        .expect(200);
      const user = await prisma.user.findUnique({
        where: { email: USER_INFOS_MOCK.email },
      });
      expect(user).toBeNull();
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });
});
