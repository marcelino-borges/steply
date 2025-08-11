import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { ActivityDto } from "@/modules/challenges/application/dtos/activity.dto";
import { ACTIVITY_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/activity.repository";
import { BaseActivityRepository } from "@/modules/challenges/infra/abstractions/activity-repository.interface";

@Injectable()
export class FindUserActivitiesUseCase extends UseCase<[number], ActivityDto[]> {
  constructor(
    @Inject(ACTIVITY_REPOSITORY_TOKEN)
    private readonly activityRepository: BaseActivityRepository,
  ) {
    super();
  }

  async execute(userId: number): Promise<ActivityDto[]> {
    return await this.activityRepository.findByUserId(userId);
  }
}