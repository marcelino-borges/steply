import { Injectable, Inject } from "@nestjs/common";
import { UserMainGoalLevelRepositoryInterface } from "@/modules/user-main-goal-levels/infra/abstractions/user-main-goal-level-repository.interface";
import { USER_MAIN_GOAL_LEVEL_REPOSITORY_TOKEN } from "@/modules/user-main-goal-levels/infra/repositories/user-main-goal-level.repository";
import { UserMainGoalLevelDto } from "@/modules/user-main-goal-levels/application/dtos/user-main-goal-level.dto";

@Injectable()
export class FindAllUserMainGoalLevelsUseCase {
  constructor(
    @Inject(USER_MAIN_GOAL_LEVEL_REPOSITORY_TOKEN)
    private readonly userMainGoalLevelRepository: UserMainGoalLevelRepositoryInterface,
  ) {}

  async execute(): Promise<UserMainGoalLevelDto[]> {
    return await this.userMainGoalLevelRepository.findAll();
  }
}
