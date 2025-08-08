import { Injectable, Inject } from "@nestjs/common";
import { UserGoalRepositoryInterface } from "@/modules/user-goals/infra/abstractions/user-goal-repository.interface";
import { USER_GOAL_REPOSITORY_TOKEN } from "@/modules/user-goals/infra/repositories/user-goal.repository";
import { UserGoalDto } from "@/modules/user-goals/application/dtos/user-goal.dto";

@Injectable()
export class FindAllUserGoalsUseCase {
  constructor(
    @Inject(USER_GOAL_REPOSITORY_TOKEN)
    private readonly userGoalRepository: UserGoalRepositoryInterface,
  ) {}

  async execute(): Promise<UserGoalDto[]> {
    return await this.userGoalRepository.findAll();
  }
}
