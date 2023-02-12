import { Prisma, PrismaClient, User, Wishlist } from '@prisma/client';

export async function seedWishesWishlist1(
  prisma: PrismaClient,
  wishlist: Wishlist,
  user: User,
) {
  await seedWish1(prisma, wishlist, user);
  await seedWish2(prisma, wishlist, user);
}

export async function seedWishesWishlist2(
  prisma: PrismaClient,
  wishlist: Wishlist,
  user: User,
) {
  await seedWish3(prisma, wishlist, user);
  await seedWish4(prisma, wishlist, user);
  await seedWish5(prisma, wishlist, user);
}

export async function seedWish1(
  prisma: PrismaClient,
  wishlist: Wishlist,
  user: User,
) {
  const data = {
    title: 'Wish #1',
    description: `First wish for wishlist ${wishlist.id}`,
    wishlist: {
      connect: {
        id: wishlist.id,
      },
    },
    creatorId: user.id,
  };
  return seedWish(prisma, data);
}

export async function seedWish2(
  prisma: PrismaClient,
  wishlist: Wishlist,
  user: User,
) {
  const data = {
    title: 'Wish #2',
    description: `Second wish for wishlist ${wishlist.id}`,
    wishlist: {
      connect: {
        id: wishlist.id,
      },
    },
    creatorId: user.id,
  };
  return seedWish(prisma, data);
}

export async function seedWish3(
  prisma: PrismaClient,
  wishlist: Wishlist,
  user: User,
) {
  const data = {
    title: 'Wish #3',
    description: `First wish for wishlist ${wishlist.id}`,
    wishlist: {
      connect: {
        id: wishlist.id,
      },
    },
    creatorId: user.id,
  };
  return seedWish(prisma, data);
}

export async function seedWish4(
  prisma: PrismaClient,
  wishlist: Wishlist,
  user: User,
) {
  const data = {
    title: 'Wish #4',
    description: `Second wish for wishlist ${wishlist.id}`,
    wishlist: {
      connect: {
        id: wishlist.id,
      },
    },
    creatorId: user.id,
  };
  return seedWish(prisma, data);
}

export async function seedWish5(
  prisma: PrismaClient,
  wishlist: Wishlist,
  user: User,
) {
  const data = {
    title: 'Wish #5',
    description: `Third wish for wishlist ${wishlist.id}`,
    wishlist: {
      connect: {
        id: wishlist.id,
      },
    },
    creatorId: user.id,
  };
  return seedWish(prisma, data);
}

export async function seedWish(
  prisma: PrismaClient,
  data: Prisma.WishCreateInput,
) {
  const wish = await prisma.wish.create({ data });
  console.log(
    `Seeded Wishlist with id ${wish.id} by user ${wish.creatorId} for wishlist with id ${wish.wishlistId} 🎁`,
  );
  return wish;
}
