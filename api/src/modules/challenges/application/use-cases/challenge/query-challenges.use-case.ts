import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { PaginatedItems } from "@/core/application/dtos/paginated-result.dto";
import { FullChallengeDto } from "@/modules/challenges/application/dtos/challenge.dto";
import { CHALLENGE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/constants/challenge.constants";
import { ChallengeQueryParamsDto } from "@/modules/challenges/application/dtos/challenge-query.dto";
import { BaseChallengeRepository } from "@/modules/challenges/infra/abstractions/challenge-repository.interface";

@Injectable()
export class QueryChallengesUseCase extends UseCase<
  [ChallengeQueryParamsDto],
  PaginatedItems<FullChallengeDto>
> {
  constructor(
    @Inject(CHALLENGE_REPOSITORY_TOKEN)
    private readonly repository: BaseChallengeRepository,
  ) {
    super();
  }

  async execute(
    params?: ChallengeQueryParamsDto,
  ): Promise<PaginatedItems<FullChallengeDto>> {
    return (await this.repository.query!(
      params,
    )) as PaginatedItems<FullChallengeDto>;
  }
}
