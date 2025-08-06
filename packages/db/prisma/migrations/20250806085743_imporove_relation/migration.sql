/*
  Warnings:

  - You are about to drop the column `cardId` on the `Room` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_cardId_fkey";

-- AlterTable
ALTER TABLE "public"."Card" ADD COLUMN     "roomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "cardId";

-- AddForeignKey
ALTER TABLE "public"."Card" ADD CONSTRAINT "Card_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
