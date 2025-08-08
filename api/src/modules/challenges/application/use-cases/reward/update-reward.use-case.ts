import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import {
  RewardDto,
  UpdateRewardDto,
} from "@/modules/challenges/application/dtos/reward.dto";
import { REWARD_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/reward.repository";
import { BaseRewardRepository } from "@/modules/challenges/infra/abstractions/reward-repository.interface";

@Injectable()
export class UpdateRewardUseCase extends UseCase<[UpdateRewardDto], RewardDto> {
  constructor(
    @Inject(REWARD_REPOSITORY_TOKEN)
    private readonly repository: BaseRewardRepository,
  ) {
    super();
  }

  async execute(updatedReward: UpdateRewardDto): Promise<RewardDto> {
    return await this.repository.update!(updatedReward);
  }
}
