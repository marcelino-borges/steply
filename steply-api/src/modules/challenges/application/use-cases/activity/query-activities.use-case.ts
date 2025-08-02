import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { PaginatedItems } from "@/core/application/dtos/paginated-result.dto";
import { ACTIVITY_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/activity.repository";
import { ActivityDto } from "@/modules/challenges/application/dtos/activity.dto";
import { ActivityQueryParamsDto } from "@/modules/challenges/application/dtos/activity-query.dto";
import { BaseActivityRepository } from "@/modules/challenges/infra/abstractions/activity-repository.interface";

@Injectable()
export class QueryActivitiesUseCase extends UseCase<
  [number, ActivityQueryParamsDto],
  PaginatedItems<ActivityDto>
> {
  constructor(
    @Inject(ACTIVITY_REPOSITORY_TOKEN)
    private readonly repository: BaseActivityRepository,
  ) {
    super();
  }

  async execute(
    challengeId: number,
    params?: ActivityQueryParamsDto,
  ): Promise<PaginatedItems<ActivityDto>> {
    return (await this.repository.query!(
      challengeId,
      params,
    )) as PaginatedItems<ActivityDto>;
  }
}
