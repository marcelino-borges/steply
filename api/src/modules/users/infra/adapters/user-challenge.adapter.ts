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
      interactionCount: prismaUserChallenge.interactionCount,
      interactions: prismaUserChallenge.interactions.map((interaction) => ({
        date: interaction.createdAt,
      })),
    };

    return toResponse;
  }
}
