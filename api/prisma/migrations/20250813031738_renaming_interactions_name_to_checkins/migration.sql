/*
  Warnings:

  - You are about to drop the column `minInteractions` on the `rank_types` table. All the data in the column will be lost.
  - You are about to drop the column `interactionCount` on the `user_challenges` table. All the data in the column will be lost.
  - You are about to drop the `users_challenges_interactions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `minCheckIns` to the `rank_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkInsCount` to the `user_challenges` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."users_challenges_interactions" DROP CONSTRAINT "users_challenges_interactions_userId_challengeId_fkey";

-- AlterTable
ALTER TABLE "public"."rank_types" DROP COLUMN "minInteractions",
ADD COLUMN     "minCheckIns" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."user_challenges" DROP COLUMN "interactionCount",
ADD COLUMN     "checkInsCount" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."users_challenges_interactions";

-- CreateTable
CREATE TABLE "public"."users_challenges_checkins" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "videoUrl" TEXT,
    "imageUrl" TEXT,
    "text" TEXT,
    "location" TEXT,
    "userId" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,

    CONSTRAINT "users_challenges_checkins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."users_challenges_checkins" ADD CONSTRAINT "users_challenges_checkins_userId_challengeId_fkey" FOREIGN KEY ("userId", "challengeId") REFERENCES "public"."user_challenges"("userId", "challengeId") ON DELETE RESTRICT ON UPDATE CASCADE;
