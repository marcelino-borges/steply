/*
  Warnings:

  - Added the required column `checkInEndOfDay` to the `challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkInTypeCode` to the `challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `multipleCheckIns` to the `challenges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."challenges" ADD COLUMN     "checkInEndOfDay" BOOLEAN NOT NULL,
ADD COLUMN     "checkInTypeCode" INTEGER NOT NULL,
ADD COLUMN     "multipleCheckIns" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "public"."ChallengeCheckInType" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "ChallengeCheckInType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeCheckInType_code_key" ON "public"."ChallengeCheckInType"("code");

-- AddForeignKey
ALTER TABLE "public"."challenges" ADD CONSTRAINT "challenges_checkInTypeCode_fkey" FOREIGN KEY ("checkInTypeCode") REFERENCES "public"."ChallengeCheckInType"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
