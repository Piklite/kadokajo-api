import { Prisma, PrismaClient } from '@prisma/client';

export async function seedUser1(prisma: PrismaClient) {
  const data = {
    email: 'user1@kado.com',
    username: 'User1',
    password: '$2b$10$vvNecQ2NxshcBrn2v9LH4emsL2uDQrIBDvbODQmziegHHsbtdHjqO', // 123
  };
  return seedUser(prisma, data);
}

export async function seedUser2(prisma: PrismaClient) {
  const data = {
    email: 'user2@kado.com',
    username: 'User2',
    password: '$2b$10$vvNecQ2NxshcBrn2v9LH4emsL2uDQrIBDvbODQmziegHHsbtdHjqO', // 123
  };
  return seedUser(prisma, data);
}

export async function seedUser(
  prisma: PrismaClient,
  data: Prisma.UserCreateInput,
) {
  const user = await prisma.user.create({ data });
  console.log(`Seeded User with id ${user.id} 👨`);
  return user;
}
