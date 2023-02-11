import { PrismaClient } from '@prisma/client';

export async function seedUsers(prisma: PrismaClient) {
  console.log('Started seeding users ...');
  await seedUser1(prisma);
  console.log('Seeded User1 👩');
  await seedUser2(prisma);
  console.log('Seeded User2 👨');
  console.log('Successfully seeded all users ✔️');
}

export async function seedUser1(prisma: PrismaClient) {
  await prisma.user.upsert({
    where: { email: 'user1@kado.com' },
    update: {},
    create: {
      email: 'user1@kado.com',
      username: 'User1',
      password: '123',
      wishlists: {},
    },
  });
}

export async function seedUser2(prisma: PrismaClient) {
  await prisma.user.upsert({
    where: { email: 'user2@kado.com' },
    update: {},
    create: {
      email: 'user2@kado.com',
      username: 'User2',
      password: '123',
      wishlists: {},
    },
  });
}
