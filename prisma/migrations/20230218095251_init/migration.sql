/*
  Warnings:

  - You are about to drop the `UsersRolesOnWishlists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersRolesOnWishlists" DROP CONSTRAINT "UsersRolesOnWishlists_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersRolesOnWishlists" DROP CONSTRAINT "UsersRolesOnWishlists_wishlistId_fkey";

-- DropTable
DROP TABLE "UsersRolesOnWishlists";

-- CreateTable
CREATE TABLE "UsersOnWishlists" (
    "id" SERIAL NOT NULL,
    "wishlistId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isCreator" BOOLEAN NOT NULL,

    CONSTRAINT "UsersOnWishlists_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersOnWishlists" ADD CONSTRAINT "UsersOnWishlists_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnWishlists" ADD CONSTRAINT "UsersOnWishlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
