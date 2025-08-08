import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { UserMainGoalLevelRepositoryInterface } from "@/modules/user-main-goal-levels/infra/abstractions/user-main-goal-level-repository.interface";
import { UserMainGoalLevelDto } from "@/modules/user-main-goal-levels/application/dtos/user-main-goal-level.dto";

export const USER_MAIN_GOAL_LEVEL_REPOSITORY_TOKEN = Symbol("UserMainGoalLevelRepository");

@Injectable()
export class UserMainGoalLevelRepository implements UserMainGoalLevelRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<UserMainGoalLevelDto[]> {
    return await this.prismaService.userMainGoalLevel.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }
}