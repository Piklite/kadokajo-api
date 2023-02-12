/*
  Warnings:

  - You are about to drop the `WishlistPartakers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WishlistPartakers" DROP CONSTRAINT "WishlistPartakers_userId_fkey";

-- DropForeignKey
ALTER TABLE "WishlistPartakers" DROP CONSTRAINT "WishlistPartakers_wishlistId_fkey";

-- DropTable
DROP TABLE "WishlistPartakers";

-- CreateTable
CREATE TABLE "WishlistsPartakers" (
    "userId" INTEGER NOT NULL,
    "wishlistId" INTEGER NOT NULL,

    CONSTRAINT "WishlistsPartakers_pkey" PRIMARY KEY ("userId","wishlistId")
);

-- AddForeignKey
ALTER TABLE "WishlistsPartakers" ADD CONSTRAINT "WishlistsPartakers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistsPartakers" ADD CONSTRAINT "WishlistsPartakers_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
