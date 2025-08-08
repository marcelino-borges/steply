/*
  Warnings:

  - You are about to drop the column `countryCodeId` on the `countries` table. All the data in the column will be lost.
  - You are about to drop the `countries_codes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phoneCode]` on the table `countries` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneCode` to the `countries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "countries" DROP CONSTRAINT "countries_countryCodeId_fkey";

-- DropIndex
DROP INDEX "countries_countryCodeId_key";

-- AlterTable
ALTER TABLE "countries" DROP COLUMN "countryCodeId",
ADD COLUMN     "phoneCode" INTEGER NOT NULL;

-- DropTable
DROP TABLE "countries_codes";

-- CreateIndex
CREATE UNIQUE INDEX "countries_phoneCode_key" ON "countries"("phoneCode");
