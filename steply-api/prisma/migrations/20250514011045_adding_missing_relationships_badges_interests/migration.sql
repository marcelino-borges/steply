/*
  Warnings:

  - The primary key for the `UserBadge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `badgeIdId` on the `UserBadge` table. All the data in the column will be lost.
  - Added the required column `badgeId` to the `UserBadge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserBadge" DROP CONSTRAINT "UserBadge_pkey",
DROP COLUMN "badgeIdId",
ADD COLUMN     "badgeId" INTEGER NOT NULL,
ADD CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("userId", "badgeId");

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
