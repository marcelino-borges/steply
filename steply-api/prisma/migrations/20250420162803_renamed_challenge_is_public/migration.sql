/*
  Warnings:

  - You are about to drop the column `public` on the `challenges` table. All the data in the column will be lost.
  - Added the required column `isPublic` to the `challenges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "public",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL;
