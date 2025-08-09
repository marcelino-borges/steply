import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { PaginatedItems } from "@/core/application/dtos/paginated-result.dto";
import {
  ActivitiesQueryBuilderDto,
  ActivityQueryParamsDto,
} from "@/modules/challenges/application/dtos/activity-query.dto";
import {
  ActivityDto,
  NonExistingActivityDto,
} from "@/modules/challenges/application/dtos/activity.dto";
import { getSafePagination } from "@/modules/challenges/infra/utils/challenge.utils";
import { BaseActivityRepository } from "@/modules/challenges/infra/abstractions/activity-repository.interface";

export const ACTIVITY_REPOSITORY_TOKEN = Symbol("ActivityRepository");

@Injectable()
export class ActivityRepository implements BaseActivityRepository {
  constructor(private readonly db: PrismaService) {}

  async query(
    challengeId: number,
    params?: ActivityQueryParamsDto,
  ): Promise<PaginatedItems<ActivityDto>> {
    const queryBuilder = new ActivitiesQueryBuilderDto(params);

    const where = queryBuilder.build(challengeId);

    const { pageNumber, pageSize } = getSafePagination(
      params?.pageNumber,
      params?.pageSize,
    );

    const findPromise = this.db.challengeActivity.findMany({
      where,
      skip: pageSize * pageNumber,
      take: pageSize,
    });

    const countPromise = this.db.challengeActivity.count({
      where,
    });

    const [findResult, countResult] = await Promise.all([
      findPromise,
      countPromise,
    ]);

    const finalResult = new PaginatedItems<ActivityDto>(
      findResult,
      countResult,
      pageNumber,
      pageSize,
    );

    return finalResult;
  }

  async findById(
    activityId: number,
    challengeId: number,
  ): Promise<ActivityDto | null> {
    const result = await this.db.challengeActivity.findUnique({
      where: {
        id: activityId,
        challengeId,
      },
    });

    return result;
  }

  async create(
    activity: NonExistingActivityDto,
    challengeId: number,
  ): Promise<ActivityDto> {
    const created = await this.db.challengeActivity.create({
      data: { ...activity, challengeId },
    });

    return created;
  }

  async update(
    activity: ActivityDto,
    challengeId: number,
  ): Promise<ActivityDto> {
    const updated = await this.db.challengeActivity.update({
      where: { id: activity.id, challengeId },
      data: activity,
    });

    return updated;
  }

  async delete(activityId: number, challengeId: number): Promise<void> {
    await this.db.challengeActivity.delete({
      where: { id: activityId, challengeId },
    });
  }
}
