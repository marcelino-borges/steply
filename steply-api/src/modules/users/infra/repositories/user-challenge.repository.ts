import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import {
  JoinChallengeDto,
  UserChallengeResponseDto,
} from "@/modules/users/application/dtos/user-challenge.dto";
import { BaseUserChallengeRepository } from "@/modules/users/infra/abstractions/user-challenge-repository.interface";
import { FULL_USER_CHALLENGE_INCLUDES } from "@/modules/users/infra/constants/full-user-challenge-includes.constant";
import { PrismaUserChallengeAdapter } from "../adapters/user-challenge.adapter";

export const USER_CHALLENGE_REPOSITORY_TOKEN = Symbol(
  "UserChallengeRepository",
);

@Injectable()
export class UserChallengeRepository implements BaseUserChallengeRepository {
  userChallengeAdapter: PrismaUserChallengeAdapter;

  constructor(private readonly db: PrismaService) {
    this.userChallengeAdapter = new PrismaUserChallengeAdapter();
  }

  async create(
    { userId }: JoinChallengeDto,
    challengeId: number,
  ): Promise<UserChallengeResponseDto> {
    const created = await this.db.userChallenge.create({
      data: {
        userId,
        challengeId,
        interactionCount: 0,
      },
      include: FULL_USER_CHALLENGE_INCLUDES,
    });

    const toResponse: UserChallengeResponseDto =
      this.userChallengeAdapter.fromPrismaToUserChallengeResponse(created);

    return toResponse;
  }

  async query(userId: number): Promise<UserChallengeResponseDto[]> {
    const userChallenges = await this.db.userChallenge.findMany({
      where: {
        userId,
      },
      include: FULL_USER_CHALLENGE_INCLUDES,
    });

    const challengesRemapped = userChallenges.map((userChallenge) =>
      this.userChallengeAdapter.fromPrismaToUserChallengeResponse(
        userChallenge,
      ),
    );

    return challengesRemapped;
  }
}
