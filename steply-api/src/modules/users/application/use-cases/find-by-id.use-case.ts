import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { FullUserResponseDto } from "@/modules/users/application/dtos/user.dto";
import { USER_REPOSITORY_TOKEN } from "@/modules/users/infra/repositories/user.repository";
import { BaseUserRepository } from "@/modules/users/infra/abstractions/user-repository.interface";

@Injectable()
export class FindUserByIdUseCase extends UseCase<
  [number],
  FullUserResponseDto | null
> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: BaseUserRepository,
  ) {
    super();
  }

  async execute(userId: number): Promise<FullUserResponseDto | null> {
    const userCreated = await this.userRepository.findById!(userId);

    return userCreated;
  }
}
