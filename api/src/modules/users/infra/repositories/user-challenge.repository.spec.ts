import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { JoinMethod } from "@/core/domain/entities/challenge.entity";
import { UserChallengeResponseDto } from "@/modules/users/application/dtos/user-challenge.dto";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import { UserChallengeRepository } from "./user-challenge.repository";
import { FULL_USER_CHALLENGE_INCLUDES } from "../constants/full-user-challenge-includes.constant";

jest.mock("prisma/client");

describe("UserChallengeRepository", () => {
  let prismaService: PrismaService;
  let userChallengeRepository: UserChallengeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserChallengeRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    prismaService = module.get(PrismaService);
    userChallengeRepository = module.get(UserChallengeRepository);
  });

  describe("create", () => {
    const userId = 234;
    const challengeId = 345;
    const newJoin = { userId };

    const existingChallenge1 = {
      id: challengeId,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: "Challenge 1 desc",
      title: "Challenge 1 title",
      isPublic: true,
      startAt: new Date(),
      endAt: new Date(),
      joinMethod: JoinMethod.OPEN,
      organizationId: 1,
      bannerUrl: null,
      rewardId: 1,
      tags: ["test", "challenge"] as string[],
    };

    const challenge1Interactions = [
      {
        id: 1,
        userId,
        challengeId: existingChallenge1.id,
        createdAt: new Date(1990, 4, 10),
        updatedAt: new Date(1990, 4, 10),
      },
      {
        id: 2,
        userId,
        challengeId: existingChallenge1.id,
        createdAt: new Date(1990, 4, 11),
        updatedAt: new Date(1990, 4, 11),
      },
      {
        id: 3,
        userId,
        challengeId: existingChallenge1.id,
        createdAt: new Date(1990, 4, 12),
        updatedAt: new Date(1990, 4, 12),
      },
    ];

    const userChallenge = {
      challengeId,
      userId,
      interactionCount: 0,
      challenge: existingChallenge1,
      interactions: challenge1Interactions,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it("should call the user challenge database function to create a challenge", async () => {
      const createSpy = jest
        .spyOn(prismaService.userChallenge, "create")
        .mockResolvedValue(userChallenge);

      await userChallengeRepository.create(newJoin, challengeId);

      expect(createSpy).toHaveBeenCalledWith({
        data: { ...newJoin, interactionCount: 0, challengeId },
        include: {
          challenge: {
            include: {
              reward: true,
            },
          },
          interactions: true,
        },
      });
    });

    it("should return the record created to make a user join a challenge", async () => {
      jest
        .spyOn(prismaService.userChallenge, "create")
        .mockResolvedValue(userChallenge);

      const expectedResult = {
        ...userChallenge.challenge,
        challengeId: userChallenge.challenge.id,
        userId,
        joinMethod: userChallenge.challenge.joinMethod as unknown as JoinMethod,
        interactionCount: 0,
        interactions: userChallenge.interactions.map((interaction) => ({
          date: interaction.createdAt,
        })),
      };

      const result = await userChallengeRepository.create(
        newJoin,
        userChallenge.challengeId,
      );

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe("query", () => {
    const userId = 234;

    const existingChallenge1 = {
      createdAt: new Date(),
      updatedAt: new Date(),
      description: "Challenge 1 desc",
      title: "Challenge 1 title",
      isPublic: true,
      startAt: new Date(),
      endAt: new Date(),
      id: 1,
      joinMethod: JoinMethod.OPEN,
      organizationId: 1,
      ownerUserId: null,
      bannerUrl: null,
      rewardId: 1,
      tags: ["test", "challenge"] as string[],
    };
    const existingChallenge2 = {
      createdAt: new Date(),
      updatedAt: new Date(),
      description: "Challenge 2 desc",
      title: "Challenge 2 title",
      isPublic: true,
      startAt: new Date(),
      endAt: new Date(),
      id: 2,
      joinMethod: JoinMethod.OPEN,
      organizationId: 2,
      ownerUserId: null,
      bannerUrl: null,
      rewardId: 2,
      tags: ["fitness", "health"] as string[],
    };

    it("should call the userChallenge database function to find all challenges related to the userId passed", async () => {
      const findManySpy = jest
        .spyOn(prismaService.userChallenge, "findMany")
        .mockResolvedValue([]);

      await userChallengeRepository.query(userId);

      expect(findManySpy).toHaveBeenCalledWith({
        where: {
          userId,
        },
        include: FULL_USER_CHALLENGE_INCLUDES,
      });
    });

    it("should return from database an array of challenges related to the userId passed", async () => {
      const challenge1Interactions = [
        {
          userId,
          challengeId: existingChallenge1.id,
          createdAt: new Date(1990, 4, 10),
        },
        {
          userId,
          challengeId: existingChallenge1.id,
          createdAt: new Date(1990, 4, 11),
        },
        {
          userId,
          challengeId: existingChallenge1.id,
          createdAt: new Date(1990, 4, 12),
        },
      ];
      const challenge2Interactions = [
        {
          userId,
          challengeId: existingChallenge2.id,
          createdAt: new Date(1990, 4, 20),
        },
        {
          userId,
          challengeId: existingChallenge2.id,
          createdAt: new Date(1990, 4, 21),
        },
        {
          userId,
          challengeId: existingChallenge2.id,
          createdAt: new Date(1990, 4, 22),
        },
      ];
      const expectedResult: UserChallengeResponseDto[] = [
        {
          ...existingChallenge1,
          challengeId: existingChallenge1.id,
          userId,
          joinMethod: existingChallenge1.joinMethod as unknown as JoinMethod,
          interactionCount: challenge1Interactions.length,
          interactions: challenge1Interactions.map((interaction) => ({
            date: interaction.createdAt,
          })),
          tags: existingChallenge1.tags,
        },
        {
          ...existingChallenge2,
          challengeId: existingChallenge2.id,
          userId,
          joinMethod: existingChallenge2.joinMethod as unknown as JoinMethod,
          interactionCount: challenge2Interactions.length,
          interactions: challenge2Interactions.map((interaction) => ({
            date: interaction.createdAt,
          })),
          tags: existingChallenge2.tags,
        },
      ];

      jest.spyOn(prismaService.userChallenge, "findMany").mockResolvedValue([
        {
          challengeId: existingChallenge1.id,
          userId,
          interactionCount: challenge1Interactions.length,
          createdAt: new Date(),
          updatedAt: new Date(),
          challenge: existingChallenge1,
          interactions: challenge1Interactions,
        },
        {
          challengeId: existingChallenge2.id,
          userId,
          interactionCount: challenge2Interactions.length,
          createdAt: new Date(),
          updatedAt: new Date(),
          challenge: existingChallenge2,
          interactions: challenge2Interactions,
        },
      ] as any);

      const result = await userChallengeRepository.query(userId);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
