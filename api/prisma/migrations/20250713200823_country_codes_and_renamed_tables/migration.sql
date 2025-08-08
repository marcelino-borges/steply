/*
  Warnings:

  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterestActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterestGeneral` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBadge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserInterestActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserInterestGeneral` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBadge" DROP CONSTRAINT "UserBadge_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "UserBadge" DROP CONSTRAINT "UserBadge_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserInterestActivity" DROP CONSTRAINT "UserInterestActivity_interestActivityId_fkey";

-- DropForeignKey
ALTER TABLE "UserInterestActivity" DROP CONSTRAINT "UserInterestActivity_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserInterestGeneral" DROP CONSTRAINT "UserInterestGeneral_interestGeneralId_fkey";

-- DropForeignKey
ALTER TABLE "UserInterestGeneral" DROP CONSTRAINT "UserInterestGeneral_userId_fkey";

-- AlterTable
ALTER TABLE "countries" ALTER COLUMN "countryCodeId" DROP DEFAULT;

-- DropTable
DROP TABLE "Badge";

-- DropTable
DROP TABLE "InterestActivity";

-- DropTable
DROP TABLE "InterestGeneral";

-- DropTable
DROP TABLE "UserBadge";

-- DropTable
DROP TABLE "UserInterestActivity";

-- DropTable
DROP TABLE "UserInterestGeneral";

-- CreateTable
CREATE TABLE "interests-general" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,

    CONSTRAINT "interests-general_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-interests-general" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "interestGeneralId" INTEGER NOT NULL,

    CONSTRAINT "user-interests-general_pkey" PRIMARY KEY ("userId","interestGeneralId")
);

-- CreateTable
CREATE TABLE "interests-activities" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,

    CONSTRAINT "interests-activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-interests-activity" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "interestActivityId" INTEGER NOT NULL,

    CONSTRAINT "user-interests-activity_pkey" PRIMARY KEY ("userId","interestActivityId")
);

-- CreateTable
CREATE TABLE "badges" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-badges" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "badgeId" INTEGER NOT NULL,

    CONSTRAINT "user-badges_pkey" PRIMARY KEY ("userId","badgeId")
);

-- AddForeignKey
ALTER TABLE "user-interests-general" ADD CONSTRAINT "user-interests-general_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-interests-general" ADD CONSTRAINT "user-interests-general_interestGeneralId_fkey" FOREIGN KEY ("interestGeneralId") REFERENCES "interests-general"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-interests-activity" ADD CONSTRAINT "user-interests-activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-interests-activity" ADD CONSTRAINT "user-interests-activity_interestActivityId_fkey" FOREIGN KEY ("interestActivityId") REFERENCES "interests-activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-badges" ADD CONSTRAINT "user-badges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-badges" ADD CONSTRAINT "user-badges_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "badges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
