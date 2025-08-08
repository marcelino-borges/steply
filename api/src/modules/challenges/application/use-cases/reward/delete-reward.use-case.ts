import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { REWARD_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/reward.repository";
import { BaseRewardRepository } from "@/modules/challenges/infra/abstractions/reward-repository.interface";

@Injectable()
export class DeleteRewardUseCase extends UseCase<[number, number], void> {
  constructor(
    @Inject(REWARD_REPOSITORY_TOKEN)
    private readonly repository: BaseRewardRepository,
  ) {
    super();
  }

  async execute(rewardId: number, challengeId: number): Promise<void> {
    await this.repository.delete!(rewardId, challengeId);
  }
}
