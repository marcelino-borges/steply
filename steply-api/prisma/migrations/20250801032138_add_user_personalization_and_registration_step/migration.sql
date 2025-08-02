-- AlterTable
ALTER TABLE "users" ADD COLUMN     "nextRegistrationStep" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "wantsAccountPersonalization" BOOLEAN NOT NULL DEFAULT false;
