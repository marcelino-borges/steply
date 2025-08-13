import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import {
  UserChallengeCheckInDto,
  UserCheckInChallengeDto,
} from "@/modules/challenges/application/dtos/challenge.dto";
import { CHALLENGE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/constants/challenge.constants";
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
    checkIn: UserCheckInChallengeDto,
  ): Promise<UserChallengeCheckInDto | null> {
    return await this.repository.createUserCheckIn(checkIn);
  }
}
