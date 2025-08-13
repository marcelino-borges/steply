import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { JoinMethodAdapter } from "@/core/application/adapters/join-method.adapter";
import { PaginatedItems } from "@/core/application/dtos/paginated-result.dto";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import {
  EXISTING_CHALLENGE_INTERACTION,
  EXISTING_CHALLENGE_MOCK,
  NON_EXISTING_CHALLENGE_INTERACTION,
  NON_EXISTING_CHALLENGE_MOCK,
} from "@/modules/challenges/__mocks__/challenge.mock";
import { CHALLENGE_INCLUDES } from "@/modules/challenges/infra/constants/challenge.constants";
import { ChallengesQueryBuilderDto } from "@/modules/challenges/application/dtos/challenge-query.dto";
import { getSafePagination } from "@/modules/challenges/infra/utils/challenge.utils";
import { ChallengeRepository } from "./challenge.repository";
import { EXISTING_USER_CHALLENGE } from "@/modules/users/__mocks__/user-challenges.mock";

describe("ChallengeRepository", () => {
  let prismaService: PrismaService;
  let challengeRepository: ChallengeRepository;
  const adapterJoinMethod = new JoinMethodAdapter();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengeRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    prismaService = module.get(PrismaService);
    challengeRepository = module.get(ChallengeRepository);
  });

  describe("create", () => {
    const dbResult = {
      ...EXISTING_CHALLENGE_MOCK,
      joinMethod: EXISTING_CHALLENGE_MOCK.joinMethod,
    };

    it("should call the database function to create a challenge", async () => {
      const createSpy = jest
        .spyOn(prismaService.challenge, "create")
        .mockResolvedValue(dbResult);

      await challengeRepository.create(NON_EXISTING_CHALLENGE_MOCK);

      expect(createSpy).toHaveBeenCalledWith({
        data: {
          ...NON_EXISTING_CHALLENGE_MOCK,
          joinMethod: adapterJoinMethod.fromDomain(
            NON_EXISTING_CHALLENGE_MOCK.joinMethod,
          ),
          activities: undefined,
        },
        include: CHALLENGE_INCLUDES,
      });
    });

    it("should return the challenge created on database", async () => {
      jest.spyOn(prismaService.challenge, "create").mockResolvedValue(dbResult);

      const result = await challengeRepository.create(
        NON_EXISTING_CHALLENGE_MOCK,
      );

      expect(result).toStrictEqual(dbResult);
    });

    it("should create a challenge with activities when activities are provided", async () => {
      const challengeWithActivities = {
        ...NON_EXISTING_CHALLENGE_MOCK,
        activities: [
          {
            title: "Morning Workout",
            description: "30 minute morning workout",
            startAt: new Date("2024-01-01T08:00:00.000Z"),
            endAt: new Date("2024-01-01T08:30:00.000Z"),
          },
          {
            title: "Evening Walk",
            description: "20 minute walk",
            startAt: new Date("2024-01-01T18:00:00.000Z"),
            endAt: new Date("2024-01-01T18:20:00.000Z"),
          },
        ],
      };

      const createSpy = jest
        .spyOn(prismaService.challenge, "create")
        .mockResolvedValue(dbResult);

      await challengeRepository.create(challengeWithActivities);

      expect(createSpy).toHaveBeenCalledWith({
        data: {
          ...NON_EXISTING_CHALLENGE_MOCK,
          joinMethod: adapterJoinMethod.fromDomain(
            NON_EXISTING_CHALLENGE_MOCK.joinMethod,
          ),
          activities: {
            create: [
              {
                title: "Morning Workout",
                description: "30 minute morning workout",
                startAt: new Date("2024-01-01T08:00:00.000Z"),
                endAt: new Date("2024-01-01T08:30:00.000Z"),
              },
              {
                title: "Evening Walk",
                description: "20 minute walk",
                startAt: new Date("2024-01-01T18:00:00.000Z"),
                endAt: new Date("2024-01-01T18:20:00.000Z"),
              },
            ],
          },
        },
        include: CHALLENGE_INCLUDES,
      });
    });
  });

  describe("update", () => {
    const updatedChallenge = {
      ...EXISTING_CHALLENGE_MOCK,
      title: "Updated title",
    };
    const dbResult = {
      ...EXISTING_CHALLENGE_MOCK,
      joinMethod: EXISTING_CHALLENGE_MOCK.joinMethod,
    };

    it("should call the database function to update a challenge", async () => {
      const updateSpy = jest
        .spyOn(prismaService.challenge, "update")
        .mockResolvedValue(dbResult);

      await challengeRepository.update(updatedChallenge);

      expect(updateSpy).toHaveBeenCalledWith({
        where: {
          id: updatedChallenge.id,
        },
        data: updatedChallenge,
        include: CHALLENGE_INCLUDES,
      });
    });

    it("should return the challenge updated on database", async () => {
      jest.spyOn(prismaService.challenge, "update").mockResolvedValue(dbResult);

      const result = await challengeRepository.update(updatedChallenge);

      expect(result).toStrictEqual(dbResult);
    });
  });

  describe("findById", () => {
    const id = 1;

    it("should call the database function to find a challenge by id", async () => {
      const findByIdSpy = jest.spyOn(prismaService.challenge, "findUnique");

      await challengeRepository.findById(id);

      expect(findByIdSpy).toHaveBeenCalledWith({
        where: {
          id,
        },
        include: CHALLENGE_INCLUDES,
      });
    });

    it("should return the challenge found by the id on database", async () => {
      const dbResult = {
        ...EXISTING_CHALLENGE_MOCK,
        joinMethod: EXISTING_CHALLENGE_MOCK.joinMethod,
      };

      jest
        .spyOn(prismaService.challenge, "findUnique")
        .mockResolvedValue(dbResult);

      const result = await challengeRepository.findById(id);

      expect(result).toStrictEqual(dbResult);
    });
  });

  describe("query", () => {
    it("should call the database function with no props, to find all challenges when no params are passed, and return the result", async () => {
      const findByIdSpy = jest
        .spyOn(prismaService.challenge, "findMany")
        .mockResolvedValue([EXISTING_CHALLENGE_MOCK]);

      const countSpy = jest
        .spyOn(prismaService.challenge, "count")
        .mockResolvedValue(1);

      const { pageNumber, pageSize } = getSafePagination(undefined, undefined);

      const result = await challengeRepository.query();

      const expectedResult = new PaginatedItems(
        [EXISTING_CHALLENGE_MOCK],
        1,
        pageNumber,
        pageSize,
      );

      expect(findByIdSpy).toHaveBeenCalledWith({
        where: undefined,
        take: pageSize,
        skip: pageNumber,
        include: CHALLENGE_INCLUDES,
      });

      expect(countSpy).toHaveBeenCalledWith({
        where: undefined,
      });

      expect(result).toEqual(expectedResult);
    });

    it("should call the database function to find challenges by organization id, when 'org' is passed as search param, and return the result", async () => {
      const params = { org: 1 };
      const queryBuilder = new ChallengesQueryBuilderDto();

      if (params.org) {
        queryBuilder.withOrganizationId(params.org);
      }

      const where = queryBuilder.build();

      const findManySpy = jest
        .spyOn(prismaService.challenge, "findMany")
        .mockResolvedValue([EXISTING_CHALLENGE_MOCK]);

      const countSpy = jest
        .spyOn(prismaService.challenge, "count")
        .mockResolvedValue(1);

      const { pageNumber, pageSize } = getSafePagination(undefined, undefined);

      const result = await challengeRepository.query(params);

      const expectedResult = new PaginatedItems(
        [EXISTING_CHALLENGE_MOCK],
        1,
        pageNumber,
        pageSize,
      );

      expect(findManySpy).toHaveBeenCalledWith({
        where,
        take: pageSize,
        skip: pageNumber,
        include: CHALLENGE_INCLUDES,
      });
      expect(countSpy).toHaveBeenCalledWith({
        where,
      });
      expect(result).toEqual(expectedResult);
    });

    it("should call the database function to find challenges by a free search term, when 'search' is passed as search param, and return the result", async () => {
      const params = { search: "text" };
      const queryBuilder = new ChallengesQueryBuilderDto();

      if (params.search) {
        queryBuilder.withSearch(params.search);
      }

      const where = queryBuilder.build();

      const { pageNumber, pageSize } = getSafePagination(undefined, undefined);

      const findManySpy = jest
        .spyOn(prismaService.challenge, "findMany")
        .mockResolvedValue([EXISTING_CHALLENGE_MOCK]);

      const countSpy = jest
        .spyOn(prismaService.challenge, "count")
        .mockResolvedValue(1);

      const result = await challengeRepository.query(params);

      const expectedResult = new PaginatedItems(
        [EXISTING_CHALLENGE_MOCK],
        1,
        pageNumber,
        pageSize,
      );

      expect(findManySpy).toHaveBeenCalledWith({
        where,
        take: pageSize,
        skip: pageNumber,
        include: CHALLENGE_INCLUDES,
      });
      expect(countSpy).toHaveBeenCalledWith({
        where,
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe("createUserInteraction", () => {
    const userChallengeWithChallengeExpanded = {
      ...EXISTING_USER_CHALLENGE,
      challenge: {
        interactionIncrement: 3,
      },
    };

    it("should return null if the referenced userChallenge doesn't exist", async () => {
      const findUserChallengeSpy = jest
        .spyOn(prismaService.userChallenge, "findFirst")
        .mockResolvedValue(null);

      const result = await challengeRepository.createUserInteraction({
        ...NON_EXISTING_CHALLENGE_INTERACTION,
        challengeId: EXISTING_CHALLENGE_INTERACTION.id,
      });

      expect(findUserChallengeSpy).toHaveBeenCalledWith({
        where: {
          userId: NON_EXISTING_CHALLENGE_INTERACTION.userId,
          challengeId: EXISTING_CHALLENGE_INTERACTION.challengeId,
        },
        include: {
          challenge: {
            select: {
              interactionIncrement: true,
            },
          },
        },
      });
      expect(result).toBeNull();
    });

    it("should increment the 'interactionCount' in user challenge, create the interaction and return this, when the user challenge exists", async () => {
      const updatedUserChallenge = {
        ...EXISTING_USER_CHALLENGE,
        interactionCount:
          EXISTING_USER_CHALLENGE.interactionCount +
          userChallengeWithChallengeExpanded.challenge.interactionIncrement,
      };

      const findUserChallengeSpy = jest
        .spyOn(prismaService.userChallenge, "findFirst")
        .mockResolvedValue(userChallengeWithChallengeExpanded);

      const transactionSpy = jest
        .spyOn(prismaService, "$transaction")
        .mockImplementation(async (fn) => {
          return fn(PRISMA_MOCK as any);
        });

      const updateSpy = jest
        .spyOn(prismaService.userChallenge, "update")
        .mockResolvedValue(updatedUserChallenge);
      const createSpy = jest
        .spyOn(prismaService.userChallengeInteraction, "create")
        .mockResolvedValue(EXISTING_CHALLENGE_INTERACTION);

      const result = await challengeRepository.createUserInteraction({
        ...NON_EXISTING_CHALLENGE_INTERACTION,
        challengeId: EXISTING_CHALLENGE_INTERACTION.id,
      });

      expect(findUserChallengeSpy).toHaveBeenCalledWith({
        where: {
          userId: NON_EXISTING_CHALLENGE_INTERACTION.userId,
          challengeId: EXISTING_CHALLENGE_INTERACTION.challengeId,
        },
        include: {
          challenge: {
            select: {
              interactionIncrement: true,
            },
          },
        },
      });
      expect(transactionSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalledWith({
        where: {
          userId_challengeId: {
            challengeId: EXISTING_CHALLENGE_INTERACTION.challengeId,
            userId: NON_EXISTING_CHALLENGE_INTERACTION.userId,
          },
        },
        data: {
          interactionCount: {
            increment:
              userChallengeWithChallengeExpanded.challenge.interactionIncrement,
          },
        },
      });
      expect(createSpy).toHaveBeenCalledWith({
        data: {
          ...NON_EXISTING_CHALLENGE_INTERACTION,
          challengeId: EXISTING_CHALLENGE_INTERACTION.id,
        },
      });
      expect(result).toStrictEqual(EXISTING_CHALLENGE_INTERACTION);
    });
  });
});
