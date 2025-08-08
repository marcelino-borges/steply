/*
  Warnings:

  - A unique constraint covering the columns `[title,lang]` on the table `rewards_types` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "challenges" ADD COLUMN     "interactionIncrement" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "rewards_types_title_lang_key" ON "rewards_types"("title", "lang");
