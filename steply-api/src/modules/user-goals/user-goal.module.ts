import { Module } from "@nestjs/common";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { UserGoalController } from "@/modules/user-goals/infra/controllers/user-goal.controller";
import { FindAllUserGoalsUseCase } from "@/modules/user-goals/application/use-cases/find-all-user-goals.use-case";
import {
  UserGoalRepository,
  USER_GOAL_REPOSITORY_TOKEN,
} from "@/modules/user-goals/infra/repositories/user-goal.repository";

@Module({
  controllers: [UserGoalController],
  providers: [
    PrismaService,
    FindAllUserGoalsUseCase,
    {
      provide: USER_GOAL_REPOSITORY_TOKEN,
      useClass: UserGoalRepository,
    },
  ],
})
export class UserGoalModule {}
