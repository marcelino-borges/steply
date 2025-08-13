import { JoinMethod } from "@/core/domain/entities/challenge.entity";
import { UserChallengeResponseDto } from "@/modules/users/application/dtos/user-challenge.dto";
import { PrismaUserChallenge } from "@/modules/users/infra/dtos/user-challenge.dto";

export class PrismaUserChallengeAdapter {
  fromPrismaToUserChallengeResponse(
    prismaUserChallenge: PrismaUserChallenge,
  ): UserChallengeResponseDto {
    const toResponse: UserChallengeResponseDto = {
      ...prismaUserChallenge.challenge,
      challengeId: prismaUserChallenge.challenge.id,
      userId: prismaUserChallenge.userId,
      joinMethod: prismaUserChallenge.challenge
        .joinMethod as unknown as JoinMethod,
      checkInsCount: prismaUserChallenge.checkInsCount,
      checkIns: prismaUserChallenge.checkIns.map((checkIn) => ({
        date: checkIn.createdAt,
      })),
      tags: prismaUserChallenge.challenge.tags,
    };

    return toResponse;
  }
}
