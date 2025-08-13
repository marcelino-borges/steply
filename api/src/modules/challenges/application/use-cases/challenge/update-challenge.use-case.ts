import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { Repository } from "@/core/domain/abstractions/repository.interface";
import {
  FullChallengeDto,
  UpdateChallengeDto,
} from "@/modules/challenges/application/dtos/challenge.dto";
import { CHALLENGE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/constants/challenge.constants";
import { BaseChallengeRepository } from "@/modules/challenges/infra/abstractions/challenge-repository.interface";

@Injectable()
export class UpdateChallengeUseCase extends UseCase<
  [UpdateChallengeDto],
  FullChallengeDto
> {
  constructor(
    @Inject(CHALLENGE_REPOSITORY_TOKEN)
    private readonly repository: BaseChallengeRepository,
  ) {
    super();
  }

  async execute(
    updatedChallenge: UpdateChallengeDto,
  ): Promise<FullChallengeDto> {
    return await this.repository.update!(updatedChallenge);
  }
}
