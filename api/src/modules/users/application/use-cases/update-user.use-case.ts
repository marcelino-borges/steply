import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import {
  UpdateUserRequestDto,
  FullUserResponseDto,
} from "@/modules/users/application/dtos/user.dto";
import { USER_REPOSITORY_TOKEN } from "@/modules/users/infra/repositories/user.repository";
import { BaseUserRepository } from "@/modules/users/infra/abstractions/user-repository.interface";

@Injectable()
export class UpdateUserUseCase extends UseCase<
  [number, UpdateUserRequestDto],
  FullUserResponseDto | null
> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: BaseUserRepository,
  ) {
    super();
  }

  async execute(
    userId: number,
    user: UpdateUserRequestDto,
  ): Promise<FullUserResponseDto | null> {
    const userCreated = await this.userRepository.update!(userId, user);

    return userCreated;
  }
}
