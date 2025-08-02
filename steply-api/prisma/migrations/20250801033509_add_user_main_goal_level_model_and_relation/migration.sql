-- AlterTable
ALTER TABLE "users" ADD COLUMN     "mainGoalLevelId" INTEGER;

-- CreateTable
CREATE TABLE "user_main_goal_levels" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lang" TEXT NOT NULL,

    CONSTRAINT "user_main_goal_levels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_main_goal_levels_name_key" ON "user_main_goal_levels"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_mainGoalLevelId_fkey" FOREIGN KEY ("mainGoalLevelId") REFERENCES "user_main_goal_levels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
