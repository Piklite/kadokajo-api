import { PrismaClient } from '@prisma/client';
import { seedUser1, seedUser2 } from './seeds/users.seeds';
import {
  seedWishlistsUser1,
  seedWishlistsUser2,
} from './seeds/wishlists.seeds';

const prisma = new PrismaClient();

async function main() {
  console.log('Started seeding database ...');
  const user1 = await seedUser1(prisma);
  const user2 = await seedUser2(prisma);
  await seedWishlistsUser1(prisma, user1, user2);
  await seedWishlistsUser2(prisma, user2);
  console.log('Successfully seeded database ✔️');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
