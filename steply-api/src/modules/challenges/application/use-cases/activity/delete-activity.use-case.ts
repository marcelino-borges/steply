import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { ACTIVITY_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/activity.repository";
import { BaseActivityRepository } from "@/modules/challenges/infra/abstractions/activity-repository.interface";

@Injectable()
export class DeleteActivityUseCase extends UseCase<[number, number], void> {
  constructor(
    @Inject(ACTIVITY_REPOSITORY_TOKEN)
    private readonly repository: BaseActivityRepository,
  ) {
    super();
  }

  async execute(activityId: number, challengeId: number): Promise<void> {
    await this.repository.delete!(activityId, challengeId);
  }
}
