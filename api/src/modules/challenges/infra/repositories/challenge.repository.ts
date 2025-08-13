import { Injectable } from "@nestjs/common";
import { Challenge } from "prisma/client";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { JoinMethodAdapter } from "@/core/application/adapters/join-method.adapter";
import { PaginatedItems } from "@/core/application/dtos/paginated-result.dto";
import {
  ChallengeDto,
  FullChallengeDto,
  NonExistingChallengeDto,
  UserChallengeCheckInDto,
  UserCheckInChallengeDto,
} from "@/modules/challenges/application/dtos/challenge.dto";
import {
  ChallengeQueryParamsDto,
  ChallengesQueryBuilderDto,
} from "@/modules/challenges/application/dtos/challenge-query.dto";
import { CHALLENGE_INCLUDES } from "@/modules/challenges/infra/constants/challenge.constants";
import { getSafePagination } from "@/modules/challenges/infra/utils/challenge.utils";
import { BaseChallengeRepository } from "@/modules/challenges/infra/abstractions/challenge-repository.interface";

export const CHALLENGE_REPOSITORY_TOKEN = Symbol("ChallengeRepository");

@Injectable()
export class ChallengeRepository implements BaseChallengeRepository {
  private readonly joinMethodAdapter: JoinMethodAdapter;

  constructor(private readonly db: PrismaService) {
    this.joinMethodAdapter = new JoinMethodAdapter();
  }

  async create(
    newChallenge: NonExistingChallengeDto,
  ): Promise<FullChallengeDto> {
    const {
      activities,
      reward,
      organizationId,
      ownerUserId,
      ...challengeData
    } = newChallenge;

    const result = await this.db.challenge.create({
      data: {
        ...challengeData,
        organizationId: organizationId || null,
        ownerUserId: ownerUserId || null,
        joinMethod: this.joinMethodAdapter.fromDomain(challengeData.joinMethod),
        activities: activities
          ? {
              create: activities.map((activity) => ({
                title: activity.title,
                description: activity.description || null,
                startAt: activity.startAt,
                endAt: activity.endAt,
              })),
            }
          : undefined,
        reward: reward
          ? {
              create: {
                name: reward.name,
                description: reward.description || null,
                rewardTypeId: reward.rewardTypeId,
                deliveryDetails: reward.deliveryDetails || null,
                imageUrl: reward.imageUrl || null,
                filesUrls: reward.filesUrls || [],
              },
            }
          : undefined,
      },
      include: CHALLENGE_INCLUDES,
    });

    return {
      ...result,
      joinMethod: this.joinMethodAdapter.toDomain(result.joinMethod),
    } as FullChallengeDto;
  }

  async update(updatedChallenge: ChallengeDto): Promise<FullChallengeDto> {
    const result = await this.db.challenge.update({
      where: {
        id: updatedChallenge.id,
      },
      data: {
        ...updatedChallenge,
        joinMethod: this.joinMethodAdapter.fromDomain(
          updatedChallenge.joinMethod,
        ),
      },
      include: CHALLENGE_INCLUDES,
    });

    return {
      ...result,
      joinMethod: this.joinMethodAdapter.toDomain(result.joinMethod),
    };
  }

  async findById(id: number): Promise<FullChallengeDto | null> {
    const result = await this.db.challenge.findUnique({
      where: {
        id,
      },
      include: CHALLENGE_INCLUDES,
    });

    if (!result) return null;

    return {
      ...result,
      joinMethod: this.joinMethodAdapter.toDomain(result.joinMethod),
    };
  }

  async query(
    params?: ChallengeQueryParamsDto,
  ): Promise<PaginatedItems<FullChallengeDto>> {
    const queryBuilder = new ChallengesQueryBuilderDto();

    if (params?.org) {
      queryBuilder.withOrganizationId(params.org);
    }

    if (params?.ownerUserId) {
      queryBuilder.withOwnerUserId(params.ownerUserId);
    }

    if (params?.search) {
      queryBuilder.withSearch(params.search);
    }

    const where = queryBuilder.build();

    const { pageNumber, pageSize } = getSafePagination(
      params?.pageNumber,
      params?.pageSize,
    );

    const findPromise = this.db.challenge.findMany({
      where: params ? where : undefined,
      skip: pageSize * pageNumber,
      take: pageSize,
      include: CHALLENGE_INCLUDES,
    });

    const countPromise = this.db.challenge.count({
      where: params ? where : undefined,
    });

    const [findResult, countResult] = await Promise.all([
      findPromise,
      countPromise,
    ]);

    const withDomainJoinMethod = findResult.map((result: Challenge) =>
      this.joinMethodAdapter.toDomain<Challenge>(result),
    ) as unknown as FullChallengeDto[];

    const finalResult: PaginatedItems<FullChallengeDto> = {
      total: countResult,
      pageNumber: pageNumber + 1,
      pageSize,
      hasNextPage:
        countResult > withDomainJoinMethod.length + pageSize * pageNumber,
      items: withDomainJoinMethod,
    };

    return finalResult;
  }

  async createUserCheckIn(
    checkIn: UserCheckInChallengeDto,
  ): Promise<UserChallengeCheckInDto | null> {
    const userChallenge = await this.db.userChallenge.findFirst({
      where: {
        userId: checkIn.userId,
        challengeId: checkIn.challengeId,
      },
      include: {
        challenge: {
          select: {
            interactionIncrement: true,
          },
        },
      },
    });

    if (!userChallenge) {
      return null;
    }

    return await this.db.$transaction(async () => {
      await this.db.userChallenge.update({
        where: {
          userId_challengeId: {
            challengeId: checkIn.challengeId,
            userId: checkIn.userId,
          },
        },
        data: {
          interactionCount: {
            increment: userChallenge.challenge.interactionIncrement,
          },
        },
      });

      return await this.db.userChallengeInteraction.create({
        data: checkIn,
      });
    });
  }
}
