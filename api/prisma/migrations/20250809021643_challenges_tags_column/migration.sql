-- AlterTable
ALTER TABLE "public"."user_challenges" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
