/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `challenges` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[challengeId,title]` on the table `rank_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "challenges_title_key" ON "challenges"("title");

-- CreateIndex
CREATE UNIQUE INDEX "rank_types_challengeId_title_key" ON "rank_types"("challengeId", "title");
