import { Inject, Injectable } from "@nestjs/common";

import { CHALLENGE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/constants/challenge.constants";
import { BaseChallengeRepository } from "@/modules/challenges/infra/abstractions/challenge-repository.interface";
import { ChallengeSummaryDto } from "@/modules/challenges/application/dtos/challenge-summary.dto";

@Injectable()
export class GetChallengeSummaryUseCase {
  constructor(
    @Inject(CHALLENGE_REPOSITORY_TOKEN)
    private readonly challengeRepository: BaseChallengeRepository,
  ) {}

  async execute(challengeId: number): Promise<ChallengeSummaryDto | null> {
    return await this.challengeRepository.getChallengeSummary(challengeId);
  }
}