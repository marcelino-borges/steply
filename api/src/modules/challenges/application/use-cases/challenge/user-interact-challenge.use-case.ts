import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import {
  UserChallengeInteractionDto,
  UserInteractChallengeDto,
} from "@/modules/challenges/application/dtos/challenge.dto";
import { CHALLENGE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/challenge.repository";
import { BaseChallengeRepository } from "@/modules/challenges/infra/abstractions/challenge-repository.interface";

@Injectable()
export class UserInteractChallengeUseCase extends UseCase<
  [UserInteractChallengeDto],
  UserChallengeInteractionDto | null
> {
  constructor(
    @Inject(CHALLENGE_REPOSITORY_TOKEN)
    private readonly repository: BaseChallengeRepository,
  ) {
    super();
  }

  async execute(
    interaction: UserInteractChallengeDto,
  ): Promise<UserChallengeInteractionDto | null> {
    return await this.repository.createUserInteraction(interaction);
  }
}
