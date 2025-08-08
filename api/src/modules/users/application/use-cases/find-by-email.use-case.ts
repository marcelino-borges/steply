import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { FullUserResponseDto } from "@/modules/users/application/dtos/user.dto";
import { USER_REPOSITORY_TOKEN } from "@/modules/users/infra/repositories/user.repository";
import { BaseUserRepository } from "@/modules/users/infra/abstractions/user-repository.interface";

@Injectable()
export class FindUserByEmailUseCase extends UseCase<
  [string],
  FullUserResponseDto | null
> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: BaseUserRepository,
  ) {
    super();
  }

  async execute(email: string): Promise<FullUserResponseDto | null> {
    const userFound = await this.userRepository.findByEmail!(email);

    return userFound;
  }
}