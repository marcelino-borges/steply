import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { RewardDto } from "@/modules/challenges/application/dtos/reward.dto";
import { REWARD_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/reward.repository";
import { BaseRewardRepository } from "@/modules/challenges/infra/abstractions/reward-repository.interface";

@Injectable()
export class FindAllRewardsUseCase extends UseCase<[number], RewardDto[]> {
  constructor(
    @Inject(REWARD_REPOSITORY_TOKEN)
    private readonly repository: BaseRewardRepository,
  ) {
    super();
  }

  async execute(challengeId: number): Promise<RewardDto[]> {
    return (await this.repository.findAll!(challengeId)) as RewardDto[];
  }
}
