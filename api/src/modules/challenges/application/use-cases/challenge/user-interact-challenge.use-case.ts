import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import {
  UserChallengeCheckInDto,
  UserCheckInChallengeDto,
} from "@/modules/challenges/application/dtos/challenge.dto";
import { CHALLENGE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/challenge.repository";
import { BaseChallengeRepository } from "@/modules/challenges/infra/abstractions/challenge-repository.interface";

@Injectable()
export class UserCheckInChallengeUseCase extends UseCase<
  [UserCheckInChallengeDto],
  UserChallengeCheckInDto | null
> {
  constructor(
    @Inject(CHALLENGE_REPOSITORY_TOKEN)
    private readonly repository: BaseChallengeRepository,
  ) {
    super();
  }

  async execute(
    interaction: UserCheckInChallengeDto,
  ): Promise<UserChallengeCheckInDto | null> {
    return await this.repository.createUserCheckIn(interaction);
  }
}
