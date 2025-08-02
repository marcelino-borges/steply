/*
  Warnings:

  - Added the required column `lang` to the `suggested_activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lang` to the `suggested_rank_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "suggested_activities" ADD COLUMN     "lang" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "suggested_rank_types" ADD COLUMN     "lang" TEXT NOT NULL;
