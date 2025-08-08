import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { UserGoalRepositoryInterface } from "@/modules/user-goals/infra/abstractions/user-goal-repository.interface";
import { UserGoalDto } from "@/modules/user-goals/application/dtos/user-goal.dto";

export const USER_GOAL_REPOSITORY_TOKEN = Symbol("UserGoalRepository");

@Injectable()
export class UserGoalRepository implements UserGoalRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<UserGoalDto[]> {
    return await this.prismaService.userGoal.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }
}
