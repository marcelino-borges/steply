/*
  Warnings:

  - A unique constraint covering the columns `[title,lang]` on the table `suggested_activities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,lang]` on the table `suggested_rank_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "suggested_activities_title_lang_key" ON "suggested_activities"("title", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "suggested_rank_types_title_lang_key" ON "suggested_rank_types"("title", "lang");
