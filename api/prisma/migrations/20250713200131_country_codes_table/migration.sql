/*
  Warnings:

  - You are about to drop the column `phoneCode` on the `countries` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[countryCodeId]` on the table `countries` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "countries" DROP COLUMN "phoneCode",
ADD COLUMN     "countryCodeId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "countries-codes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "countries-codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_countryCodeId_key" ON "countries"("countryCodeId");

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_countryCodeId_fkey" FOREIGN KEY ("countryCodeId") REFERENCES "countries-codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
