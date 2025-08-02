/*
  Warnings:

  - You are about to drop the column `deliveryTypeId` on the `rewards` table. All the data in the column will be lost.
  - You are about to drop the `delivery_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "rewards" DROP CONSTRAINT "rewards_deliveryTypeId_fkey";

-- AlterTable
ALTER TABLE "rewards" DROP COLUMN "deliveryTypeId",
ADD COLUMN     "deliveryDetails" TEXT;

-- DropTable
DROP TABLE "delivery_types";
