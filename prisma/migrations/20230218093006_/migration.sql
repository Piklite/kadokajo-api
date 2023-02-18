/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the `WishlistsPartakers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "WishlistsPartakers" DROP CONSTRAINT "WishlistsPartakers_userId_fkey";

-- DropForeignKey
ALTER TABLE "WishlistsPartakers" DROP CONSTRAINT "WishlistsPartakers_wishlistId_fkey";

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "ownerId";

-- DropTable
DROP TABLE "WishlistsPartakers";

-- CreateTable
CREATE TABLE "UsersRolesOnWishlists" (
    "id" SERIAL NOT NULL,
    "wishlistId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isCreator" BOOLEAN NOT NULL,
    "isPartaker" BOOLEAN NOT NULL,

    CONSTRAINT "UsersRolesOnWishlists_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersRolesOnWishlists" ADD CONSTRAINT "UsersRolesOnWishlists_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersRolesOnWishlists" ADD CONSTRAINT "UsersRolesOnWishlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
