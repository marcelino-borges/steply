/*
  Warnings:

  - You are about to drop the column `tags` on the `user_challenges` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."challenges" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "public"."user_challenges" DROP COLUMN "tags";
