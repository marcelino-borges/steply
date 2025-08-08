import { Module } from "@nestjs/common";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { UserMainGoalLevelController } from "@/modules/user-main-goal-levels/infra/controllers/user-main-goal-level.controller";
import { FindAllUserMainGoalLevelsUseCase } from "@/modules/user-main-goal-levels/application/use-cases/find-all-user-main-goal-levels.use-case";
import {
  UserMainGoalLevelRepository,
  USER_MAIN_GOAL_LEVEL_REPOSITORY_TOKEN,
} from "@/modules/user-main-goal-levels/infra/repositories/user-main-goal-level.repository";

@Module({
  controllers: [UserMainGoalLevelController],
  providers: [
    PrismaService,
    FindAllUserMainGoalLevelsUseCase,
    {
      provide: USER_MAIN_GOAL_LEVEL_REPOSITORY_TOKEN,
      useClass: UserMainGoalLevelRepository,
    },
  ],
})
export class UserMainGoalLevelModule {}
