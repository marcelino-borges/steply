import { Inject, Injectable } from "@nestjs/common";

import { Lang } from "@/core/application/locales";
import { RewardTypeDto } from "@/modules/challenges/application/dtos/reward-type.dto";
import { RewardTypeRepositoryInterface } from "@/modules/challenges/infra/abstractions/reward-type-repository.interface";
import { REWARD_TYPE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/reward-type.repository";

@Injectable()
export class FindAllRewardTypesUseCase {
  constructor(
    @Inject(REWARD_TYPE_REPOSITORY_TOKEN)
    private readonly rewardTypeRepository: RewardTypeRepositoryInterface,
  ) {}

  async execute(lang: Lang): Promise<RewardTypeDto[]> {
    return await this.rewardTypeRepository.findAll(lang);
  }
}