/*
  Warnings:

  - Added the required column `acceptsCommunication` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "acceptsCommunication" BOOLEAN NOT NULL,
ALTER COLUMN "pictureUrl" DROP DEFAULT,
ALTER COLUMN "bio" DROP DEFAULT;
