import * as request from 'supertest';

export let access_token: string;

export const USER_INFOS_MOCK = {
  email: 'john_connor@kadokajo.com',
  username: 'JohnConnor',
  password: 'h@st@l@v15t@b@by!',
  confirmPassword: 'h@st@l@v15t@b@by!',
};

export async function createTestUser(httpServer: unknown): Promise<void> {
  await request(httpServer)
    .post('/auth/create-account')
    .send({ ...USER_INFOS_MOCK })
    .expect(201);
}

export async function loginTestUser(httpServer: unknown): Promise<void> {
  await request(httpServer)
    .post('/auth/login')
    .send({
      email: USER_INFOS_MOCK.email,
      password: USER_INFOS_MOCK.password,
    })
    .then((res) => (access_token = res.body.access_token));
}

export async function deleteTestUser(httpServer: unknown): Promise<void> {
  await request(httpServer)
    .delete('/auth/delete-account')
    .send({ ...USER_INFOS_MOCK })
    .expect(200);
}
