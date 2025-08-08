/*
  Warnings:

  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Challenge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeliveryType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RankType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reward` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RewardType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SuggestedActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SuggestedRankType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserChallenge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserChallengeInteraction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_rewardId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "RankType" DROP CONSTRAINT "RankType_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "Reward" DROP CONSTRAINT "Reward_deliveryTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Reward" DROP CONSTRAINT "Reward_rewardTypeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_countryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "UserChallenge" DROP CONSTRAINT "UserChallenge_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "UserChallenge" DROP CONSTRAINT "UserChallenge_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserChallengeInteraction" DROP CONSTRAINT "UserChallengeInteraction_userId_challengeId_fkey";

-- DropTable
DROP TABLE "Activity";

-- DropTable
DROP TABLE "Challenge";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "DeliveryType";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "RankType";

-- DropTable
DROP TABLE "Reward";

-- DropTable
DROP TABLE "RewardType";

-- DropTable
DROP TABLE "SuggestedActivity";

-- DropTable
DROP TABLE "SuggestedRankType";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserChallenge";

-- DropTable
DROP TABLE "UserChallengeInteraction";

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "phoneCode" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "addressNumber" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "addressNumber" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "organizationId" INTEGER,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "bannerUrl" TEXT,
    "public" BOOLEAN NOT NULL,
    "joinMethod" "JoinMethod" NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "rewardId" INTEGER,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_challenges" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "interactionCount" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,

    CONSTRAINT "user_challenges_pkey" PRIMARY KEY ("userId","challengeId")
);

-- CreateTable
CREATE TABLE "users_challenges_interactions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "interactionsIncremented" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,

    CONSTRAINT "users_challenges_interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rewards" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rewardTypeId" INTEGER NOT NULL,
    "deliveryTypeId" INTEGER,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "challengeId" INTEGER NOT NULL,

    CONSTRAINT "rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rewards_types" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL,
    "recommended" BOOLEAN NOT NULL,
    "lang" TEXT NOT NULL,

    CONSTRAINT "rewards_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_types" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL,
    "lang" TEXT NOT NULL,

    CONSTRAINT "delivery_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "challengeId" INTEGER NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rank_types" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "minInteractions" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,

    CONSTRAINT "rank_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suggested_activities" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "suggested_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suggested_rank_types" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "suggested_rank_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_cnpj_key" ON "organizations"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_ownerId_key" ON "organizations"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "challenges_rewardId_key" ON "challenges"("rewardId");

-- CreateIndex
CREATE UNIQUE INDEX "user_challenges_userId_challengeId_key" ON "user_challenges"("userId", "challengeId");

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "rewards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_challenges" ADD CONSTRAINT "user_challenges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_challenges" ADD CONSTRAINT "user_challenges_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_challenges_interactions" ADD CONSTRAINT "users_challenges_interactions_userId_challengeId_fkey" FOREIGN KEY ("userId", "challengeId") REFERENCES "user_challenges"("userId", "challengeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_rewardTypeId_fkey" FOREIGN KEY ("rewardTypeId") REFERENCES "rewards_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_deliveryTypeId_fkey" FOREIGN KEY ("deliveryTypeId") REFERENCES "delivery_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rank_types" ADD CONSTRAINT "rank_types_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
