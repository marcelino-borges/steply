/*
  Warnings:

  - You are about to drop the column `rewardId` on the `challenges` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[challengeId]` on the table `rewards` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "challenges" DROP CONSTRAINT "challenges_rewardId_fkey";

-- DropIndex
DROP INDEX "challenges_rewardId_key";

-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "rewardId";

-- CreateIndex
CREATE UNIQUE INDEX "rewards_challengeId_key" ON "rewards"("challengeId");

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
