import { Prisma, PrismaClient, User } from '@prisma/client';

export async function seedWishlist1(
  prisma: PrismaClient,
  owner: User,
  partaker: User,
) {
  const data = {
    title: 'Wishlist #1',
    description: `First wishlist for user ${owner.username}`,
    users: {
      createMany: {
        data: [
          {
            userId: owner.id,
            isCreator: true,
          },
          {
            userId: partaker.id,
            isCreator: false,
          },
        ],
      },
    },
  };
  return seedWishlist(prisma, data);
}

export async function seedWishlist2(prisma: PrismaClient, owner: User) {
  const data: Prisma.WishlistCreateInput = {
    title: 'Wishlist #2',
    description: `Second wishlist for user ${owner.username}`,
    users: {
      createMany: {
        data: [
          {
            userId: owner.id,
            isCreator: true,
          },
        ],
      },
    },
  };

  return seedWishlist(prisma, data);
}

export async function seedWishlist3(prisma: PrismaClient, owner: User) {
  const data = {
    title: 'Wishlist #3',
    description: `First wishlist for user ${owner.username}`,
    users: {
      create: {
        userId: owner.id,
        isCreator: true,
      },
    },
  };

  return seedWishlist(prisma, data);
}

export async function seedWishlist(
  prisma: PrismaClient,
  data: Prisma.WishlistCreateInput,
) {
  const wishlist = await prisma.wishlist.create({ data });
  console.log(`Seeded Wishlist with id ${wishlist.id} 🗃️`);
  return wishlist;
}
