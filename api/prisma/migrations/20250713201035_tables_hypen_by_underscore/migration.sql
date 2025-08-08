/*
  Warnings:

  - You are about to drop the `countries-codes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interests-activities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interests-general` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user-badges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user-interests-activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user-interests-general` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "countries" DROP CONSTRAINT "countries_countryCodeId_fkey";

-- DropForeignKey
ALTER TABLE "user-badges" DROP CONSTRAINT "user-badges_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "user-badges" DROP CONSTRAINT "user-badges_userId_fkey";

-- DropForeignKey
ALTER TABLE "user-interests-activity" DROP CONSTRAINT "user-interests-activity_interestActivityId_fkey";

-- DropForeignKey
ALTER TABLE "user-interests-activity" DROP CONSTRAINT "user-interests-activity_userId_fkey";

-- DropForeignKey
ALTER TABLE "user-interests-general" DROP CONSTRAINT "user-interests-general_interestGeneralId_fkey";

-- DropForeignKey
ALTER TABLE "user-interests-general" DROP CONSTRAINT "user-interests-general_userId_fkey";

-- DropTable
DROP TABLE "countries-codes";

-- DropTable
DROP TABLE "interests-activities";

-- DropTable
DROP TABLE "interests-general";

-- DropTable
DROP TABLE "user-badges";

-- DropTable
DROP TABLE "user-interests-activity";

-- DropTable
DROP TABLE "user-interests-general";

-- CreateTable
CREATE TABLE "countries_codes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "countries_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interests_general" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,

    CONSTRAINT "interests_general_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_interests_general" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "interestGeneralId" INTEGER NOT NULL,

    CONSTRAINT "user_interests_general_pkey" PRIMARY KEY ("userId","interestGeneralId")
);

-- CreateTable
CREATE TABLE "interests_activities" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,

    CONSTRAINT "interests_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_interests_activity" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "interestActivityId" INTEGER NOT NULL,

    CONSTRAINT "user_interests_activity_pkey" PRIMARY KEY ("userId","interestActivityId")
);

-- CreateTable
CREATE TABLE "user_badges" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "badgeId" INTEGER NOT NULL,

    CONSTRAINT "user_badges_pkey" PRIMARY KEY ("userId","badgeId")
);

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_countryCodeId_fkey" FOREIGN KEY ("countryCodeId") REFERENCES "countries_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interests_general" ADD CONSTRAINT "user_interests_general_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interests_general" ADD CONSTRAINT "user_interests_general_interestGeneralId_fkey" FOREIGN KEY ("interestGeneralId") REFERENCES "interests_general"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interests_activity" ADD CONSTRAINT "user_interests_activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interests_activity" ADD CONSTRAINT "user_interests_activity_interestActivityId_fkey" FOREIGN KEY ("interestActivityId") REFERENCES "interests_activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "badges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
