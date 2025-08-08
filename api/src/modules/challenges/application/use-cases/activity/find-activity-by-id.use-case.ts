import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { ACTIVITY_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/activity.repository";
import { ActivityDto } from "@/modules/challenges/application/dtos/activity.dto";
import { BaseActivityRepository } from "@/modules/challenges/infra/abstractions/activity-repository.interface";

@Injectable()
export class FindActivityByIdUseCase extends UseCase<
  [number, number],
  ActivityDto | null
> {
  constructor(
    @Inject(ACTIVITY_REPOSITORY_TOKEN)
    private readonly repository: BaseActivityRepository,
  ) {
    super();
  }

  async execute(
    activityId: number,
    challengeId: number,
  ): Promise<ActivityDto | null> {
    return await this.repository.findById!(activityId, challengeId);
  }
}
