import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import {
  NonExistentUserDto,
  FullUserResponseDto,
} from "@/modules/users/application/dtos/user.dto";
import { USER_REPOSITORY_TOKEN } from "@/modules/users/infra/repositories/user.repository";
import { BaseUserRepository } from "@/modules/users/infra/abstractions/user-repository.interface";

@Injectable()
export class CreateUserUseCase extends UseCase<
  [NonExistentUserDto],
  FullUserResponseDto
> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: BaseUserRepository,
  ) {
    super();
  }

  async execute(data: NonExistentUserDto): Promise<FullUserResponseDto> {
    return await this.userRepository.create!(data);
  }
}
