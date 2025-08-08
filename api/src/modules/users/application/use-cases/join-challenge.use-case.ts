import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import {
  JoinChallengeDto,
  UserChallengeResponseDto,
} from "@/modules/users/application/dtos/user-challenge.dto";
import { USER_CHALLENGE_REPOSITORY_TOKEN } from "@/modules/users/infra/repositories/user-challenge.repository";
import { BaseUserChallengeRepository } from "@/modules/users/infra/abstractions/user-challenge-repository.interface";

@Injectable()
export class JoinChallengeUseCase extends UseCase<
  [JoinChallengeDto, number],
  UserChallengeResponseDto
> {
  constructor(
    @Inject(USER_CHALLENGE_REPOSITORY_TOKEN)
    private readonly userRepository: BaseUserChallengeRepository,
  ) {
    super();
  }

  async execute(
    data: JoinChallengeDto,
    challengeId: number,
  ): Promise<UserChallengeResponseDto> {
    const userCreated = await this.userRepository.create!(data, challengeId);

    return userCreated;
  }
}
