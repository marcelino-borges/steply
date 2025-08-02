import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { UserChallengeResponseDto } from "@/modules/users/application/dtos/user-challenge.dto";
import { USER_CHALLENGE_REPOSITORY_TOKEN } from "@/modules/users/infra/repositories/user-challenge.repository";
import { BaseUserRepository } from "@/modules/users/infra/abstractions/user-repository.interface";

@Injectable()
export class FindAllUserChallengesUseCase extends UseCase<
  [number],
  UserChallengeResponseDto[]
> {
  constructor(
    @Inject(USER_CHALLENGE_REPOSITORY_TOKEN)
    private readonly userChallengesRepository: BaseUserRepository,
  ) {
    super();
  }

  async execute(userId: number): Promise<UserChallengeResponseDto[]> {
    const userCreated = (await this.userChallengesRepository.query!(
      userId,
    )) as unknown as UserChallengeResponseDto[];

    return userCreated;
  }
}
