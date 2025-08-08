import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import {
  ActivityDto,
  NonExistingActivityDto,
} from "@/modules/challenges/application/dtos/activity.dto";
import { ACTIVITY_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/activity.repository";
import { BaseActivityRepository } from "@/modules/challenges/infra/abstractions/activity-repository.interface";

@Injectable()
export class CreateActivityUseCase extends UseCase<
  [NonExistingActivityDto, number],
  ActivityDto
> {
  constructor(
    @Inject(ACTIVITY_REPOSITORY_TOKEN)
    private readonly repository: BaseActivityRepository,
  ) {
    super();
  }

  async execute(
    newActivity: NonExistingActivityDto,
    challengeId: number,
  ): Promise<ActivityDto> {
    return await this.repository.create!(newActivity, challengeId);
  }
}
