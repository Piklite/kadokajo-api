import * as request from 'supertest';

export let access_token: string;

export async function loginUser1(httpServer) {
  await request(httpServer)
    .post('/auth/login')
    .send({
      email: 'user1@kado.com',
      password: '123',
    })
    .then((res) => (access_token = res.body.access_token));
}
