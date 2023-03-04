-- DropForeignKey
ALTER TABLE "UsersOnWishlists" DROP CONSTRAINT "UsersOnWishlists_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnWishlists" DROP CONSTRAINT "UsersOnWishlists_wishlistId_fkey";

-- AddForeignKey
ALTER TABLE "UsersOnWishlists" ADD CONSTRAINT "UsersOnWishlists_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnWishlists" ADD CONSTRAINT "UsersOnWishlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
