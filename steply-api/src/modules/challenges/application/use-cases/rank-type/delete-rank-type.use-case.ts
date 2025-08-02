import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { RANK_TYPE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/rank-type.repository";
import { BaseRankTypeRepository } from "@/modules/challenges/infra/abstractions/rank-type-repository.interface";

@Injectable()
export class DeleteRankTypeUseCase extends UseCase<[number, number], void> {
  constructor(
    @Inject(RANK_TYPE_REPOSITORY_TOKEN)
    private readonly repository: BaseRankTypeRepository,
  ) {
    super();
  }

  async execute(rankTypeId: number, challengeId: number): Promise<void> {
    return (await this.repository.delete!(rankTypeId, challengeId)) as void;
  }
}
