/*
  Warnings:

  - You are about to drop the column `total` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the `Cart_Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wishlist_Item` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Wishlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Wishlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart_Item" DROP CONSTRAINT "Cart_Item_cartId_fkey";

-- DropForeignKey
ALTER TABLE "Cart_Item" DROP CONSTRAINT "Cart_Item_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist_Item" DROP CONSTRAINT "Wishlist_Item_productId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist_Item" DROP CONSTRAINT "Wishlist_Item_wishlistId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "total",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "total",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Cart_Item";

-- DropTable
DROP TABLE "Wishlist_Item";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
