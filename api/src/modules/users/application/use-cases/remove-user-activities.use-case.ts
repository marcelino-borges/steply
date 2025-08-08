import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { USER_REPOSITORY_TOKEN } from "@/modules/users/infra/repositories/user.repository";
import { BaseUserRepository } from "@/modules/users/infra/abstractions/user-repository.interface";

@Injectable()
export class RemoveUserActivitiesUseCase extends UseCase<
  [number, number[]],
  void
> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: BaseUserRepository,
  ) {
    super();
  }

  async execute(userId: number, activityIds: number[]): Promise<void> {
    await this.userRepository.removeActivities!(userId, activityIds);
  }
}
