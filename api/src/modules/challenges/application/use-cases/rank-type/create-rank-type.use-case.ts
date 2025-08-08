import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import {
  NonExistingRankTypeDto,
  RankTypeDto,
} from "@/modules/challenges/application/dtos/rank-type.dto";
import { RANK_TYPE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/rank-type.repository";
import { BaseRankTypeRepository } from "@/modules/challenges/infra/abstractions/rank-type-repository.interface";

@Injectable()
export class CreateRankTypeUseCase extends UseCase<
  [NonExistingRankTypeDto, number],
  RankTypeDto
> {
  constructor(
    @Inject(RANK_TYPE_REPOSITORY_TOKEN)
    private readonly repository: BaseRankTypeRepository,
  ) {
    super();
  }

  async execute(
    newRankType: NonExistingRankTypeDto,
    challengeId: number,
  ): Promise<RankTypeDto> {
    return await this.repository.create!(newRankType, challengeId);
  }
}
