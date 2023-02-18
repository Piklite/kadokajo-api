/*
  Warnings:

  - The primary key for the `UsersOnWishlists` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UsersOnWishlists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UsersOnWishlists" DROP CONSTRAINT "UsersOnWishlists_pkey",
DROP COLUMN "id",
ALTER COLUMN "isCreator" SET DEFAULT false,
ADD CONSTRAINT "UsersOnWishlists_pkey" PRIMARY KEY ("wishlistId", "userId");
