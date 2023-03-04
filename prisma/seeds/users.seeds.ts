import { Prisma, PrismaClient, User } from '@prisma/client';

export async function seedUser1(prisma: PrismaClient): Promise<User> {
  const data = {
    email: 'user1@kado.com',
    username: 'User1',
    password: '$2b$10$vvNecQ2NxshcBrn2v9LH4emsL2uDQrIBDvbODQmziegHHsbtdHjqO', // 123
  };
  return seedUser(prisma, data);
}

export async function seedUser2(prisma: PrismaClient): Promise<User> {
  const data = {
    email: 'user2@kado.com',
    username: 'User2',
    password: '$2b$10$vvNecQ2NxshcBrn2v9LH4emsL2uDQrIBDvbODQmziegHHsbtdHjqO', // 123
  };
  return seedUser(prisma, data);
}

export async function seedUser3(prisma: PrismaClient): Promise<User> {
  const data = {
    email: 'user3@kado.com',
    username: 'User3',
    password: '$2b$10$vvNecQ2NxshcBrn2v9LH4emsL2uDQrIBDvbODQmziegHHsbtdHjqO', // 123
  };
  return seedUser(prisma, data);
}

export async function seedJohnConnor(prisma: PrismaClient): Promise<User> {
  const data = {
    email: 'john_connor@kadokajo.com',
    username: 'JohnConnor',
    password: '$2b$10$RXz40reV5UlqAGBOTWyA5.p.wL8.225Q9DJw/4d/MQNNIi6qCX8Nm', // h@st@l@v15t@b@by!
  };
  const user = await prisma.user.create({ data });
  console.log(`Seeded User ${user.username} with id ${user.id} 👨`);
  return user;
}

export async function seedUser(
  prisma: PrismaClient,
  data: Prisma.UserCreateInput,
): Promise<User> {
  const user = await prisma.user.create({ data });
  console.log(`Seeded User with id ${user.id} 👨`);
  return user;
}
