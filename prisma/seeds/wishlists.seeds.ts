import { Prisma, PrismaClient, User } from '@prisma/client';

export async function seedWishlistsUser1(
  prisma: PrismaClient,
  user1: User,
  user2: User,
) {
  await seedWishlist1(prisma, user1);
  await seedWishlist2(prisma, user1, user2);
}

export async function seedWishlistsUser2(prisma: PrismaClient, owner: User) {
  await seedWishlist3(prisma, owner);
}

export async function seedWishlist1(prisma: PrismaClient, owner: User) {
  const data = {
    title: 'Wishlist #1',
    description: `First wishlist for user ${owner.username}`,
    createdBy: {
      connect: { id: owner.id },
    },
    partakers: {
      create: [{ userId: owner.id }],
    },
  };
  return seedWishlist(prisma, data);
}

export async function seedWishlist2(
  prisma: PrismaClient,
  owner: User,
  partaker: User,
) {
  const data: Prisma.WishlistCreateInput = {
    title: 'Wishlist #2',
    description: `Second wishlist for user ${owner.username}`,
    createdBy: {
      connect: { id: owner.id },
    },
    partakers: {
      create: [{ userId: owner.id }, { userId: partaker.id }],
    },
  };

  return seedWishlist(prisma, data);
}

export async function seedWishlist3(prisma: PrismaClient, owner: User) {
  const data = {
    title: 'Wishlist #3',
    description: `First wishlist for user ${owner.username}`,
    createdBy: {
      connect: { id: owner.id },
    },
    partakers: {
      create: [{ userId: owner.id }],
    },
  };

  return seedWishlist(prisma, data);
}

export async function seedWishlist(
  prisma: PrismaClient,
  data: Prisma.WishlistCreateInput,
) {
  const wishlist = await prisma.wishlist.create({ data });
  console.log(
    `Seeded Wishlist with id ${wishlist.id} for user with id ${wishlist.ownerId} 🗃️`,
  );
  return wishlist;
}
