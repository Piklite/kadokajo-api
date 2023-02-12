import { PrismaClient } from '@prisma/client';
import { seedUser1, seedUser2 } from './seeds/users.seeds';
import {
  seedWish1,
  seedWish2,
  seedWish3,
  seedWish4,
  seedWish5,
} from './seeds/wishes.seed';
import {
  seedWishlist1,
  seedWishlist2,
  seedWishlist3,
} from './seeds/wishlists.seeds';

const prisma = new PrismaClient();

async function main() {
  console.log('Started seeding database ...');
  const user1 = await seedUser1(prisma);
  const user2 = await seedUser2(prisma);
  const wishlist1 = await seedWishlist1(prisma, user1);
  const wishlist2 = await seedWishlist2(prisma, user1, user2);
  const wishlist3 = await seedWishlist3(prisma, user2);
  await seedWish1(prisma, wishlist1, user1);
  await seedWish2(prisma, wishlist1, user1);
  await seedWish3(prisma, wishlist2, user1);
  await seedWish4(prisma, wishlist2, user2);
  await seedWish5(prisma, wishlist3, user1);
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
