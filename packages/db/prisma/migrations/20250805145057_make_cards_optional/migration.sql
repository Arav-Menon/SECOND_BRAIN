-- DropForeignKey
ALTER TABLE "public"."Group" DROP CONSTRAINT "Group_cardId_fkey";

-- AlterTable
ALTER TABLE "public"."Group" ALTER COLUMN "cardId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Group" ADD CONSTRAINT "Group_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "public"."Card"("id") ON DELETE SET NULL ON UPDATE CASCADE;
