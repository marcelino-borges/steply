-- DropForeignKey
ALTER TABLE "public"."challenges" DROP CONSTRAINT "challenges_organizationId_fkey";

-- AlterTable
ALTER TABLE "public"."challenges" ADD COLUMN     "ownerUserId" INTEGER,
ALTER COLUMN "organizationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."challenges" ADD CONSTRAINT "challenges_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."challenges" ADD CONSTRAINT "challenges_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
