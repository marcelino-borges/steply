import { JoinMethod as PrismaJoinMethod } from "prisma/client";
import { UserChallengeResponseDto } from "../../application/dtos/user-challenge.dto";
import { PrismaUserChallenge } from "../dtos/user-challenge.dto";
import { JoinMethod } from "@/core/domain/entities/challenge.entity";
import { PrismaUserChallengeAdapter } from "./user-challenge.adapter";

describe("PrismaUserChallengeAdapter", () => {
  describe("fromPrismaToUserChallengeResponse", () => {
    it("should return a UserChallengeResponse object from a PrismaUserChallenge", () => {
      const prismaUserChallenge: PrismaUserChallenge = {
        challenge: {
          id: 1,
          bannerUrl: "bannerUrl",
          description: "description",
          createdAt: new Date(),
          updatedAt: new Date(),
          endAt: new Date(),
          startAt: new Date(),
          title: "title",
          interactionIncrement: 1,
          isPublic: true,
          joinMethod: PrismaJoinMethod.APPROVAL,
          organizationId: 1,
          tags: ["test", "adapter"] as string[],
          reward: {
            challengeId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            deliveryDetails: "Details",
            description: "desc",
            id: 1,
            name: "Name",
            rewardTypeId: 2,
          },
        },
        challengeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        interactionCount: 100,
        userId: 1,
        interactions: [
          {
            challengeId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: 1,
            imageUrl: "http://image.url",
            location: "location",
            text: "text",
            userId: 1,
            videoUrl: "http://video.url",
          },
        ],
      };

      const expectedResult: UserChallengeResponseDto = {
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

      const adapter = new PrismaUserChallengeAdapter();

      const result =
        adapter.fromPrismaToUserChallengeResponse(prismaUserChallenge);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
