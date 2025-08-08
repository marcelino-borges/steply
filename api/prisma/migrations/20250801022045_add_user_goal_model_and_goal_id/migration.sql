-- AlterTable
ALTER TABLE "users" ADD COLUMN     "goalId" INTEGER;

-- CreateTable
CREATE TABLE "user_goals" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,

    CONSTRAINT "user_goals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "user_goals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
