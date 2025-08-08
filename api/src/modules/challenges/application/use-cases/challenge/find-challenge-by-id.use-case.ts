import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { FullChallengeDto } from "@/modules/challenges/application/dtos/challenge.dto";
import { CHALLENGE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/challenge.repository";
import { BaseChallengeRepository } from "@/modules/challenges/infra/abstractions/challenge-repository.interface";

@Injectable()
export class FindChallengeByIdUseCase extends UseCase<
  [number],
  FullChallengeDto | null
> {
  constructor(
    @Inject(CHALLENGE_REPOSITORY_TOKEN)
    private readonly repository: BaseChallengeRepository,
  ) {
    super();
  }

  async execute(id: number): Promise<FullChallengeDto | null> {
    const challengeFound = await this.repository.findById!(id);

    return challengeFound;
  }
}
