/*
  Warnings:

  - You are about to drop the `ChallengeCheckInType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."challenges" DROP CONSTRAINT "challenges_checkInTypeCode_fkey";

-- DropTable
DROP TABLE "public"."ChallengeCheckInType";

-- CreateTable
CREATE TABLE "public"."challenges_checkin_types" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "challenges_checkin_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "challenges_checkin_types_code_key" ON "public"."challenges_checkin_types"("code");

-- AddForeignKey
ALTER TABLE "public"."challenges" ADD CONSTRAINT "challenges_checkInTypeCode_fkey" FOREIGN KEY ("checkInTypeCode") REFERENCES "public"."challenges_checkin_types"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
