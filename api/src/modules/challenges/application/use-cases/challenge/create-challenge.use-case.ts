import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import {
  FullChallengeDto,
  NonExistingChallengeDto,
} from "@/modules/challenges/application/dtos/challenge.dto";
import { CHALLENGE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/constants/challenge.constants";
import { BaseChallengeRepository } from "@/modules/challenges/infra/abstractions/challenge-repository.interface";

@Injectable()
export class CreateChallengeUseCase extends UseCase<
  [NonExistingChallengeDto],
  FullChallengeDto
> {
  constructor(
    @Inject(CHALLENGE_REPOSITORY_TOKEN)
    private readonly repository: BaseChallengeRepository,
  ) {
    super();
  }

  async execute(
    newChallenge: NonExistingChallengeDto,
  ): Promise<FullChallengeDto> {
    return await this.repository.create!(newChallenge);
  }
}
