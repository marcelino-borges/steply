import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";

import { t } from "@/core/application/locales";
import { PaginatedItems } from "@/core/application/dtos/paginated-result.dto";
import { CreateChallengeUseCase } from "@/modules/challenges/application/use-cases/challenge/create-challenge.use-case";
import { UpdateChallengeUseCase } from "@/modules/challenges/application/use-cases/challenge/update-challenge.use-case";
import { FindChallengeByIdUseCase } from "@/modules/challenges/application/use-cases/challenge/find-challenge-by-id.use-case";
import { QueryChallengesUseCase } from "@/modules/challenges/application/use-cases/challenge/query-challenges.use-case";
import {
  EXISTING_CHALLENGE_INTERACTION,
  EXISTING_CHALLENGE_MOCK,
  EXISTING_FULL_CHALLENGE_MOCK,
  NON_EXISTING_CHALLENGE_INTERACTION,
  NON_EXISTING_CHALLENGE_MOCK,
} from "@/modules/challenges/__mocks__/challenge.mock";
import { UserInteractChallengeUseCase } from "@/modules/challenges/application/use-cases/challenge/user-interact-challenge.use-case";
import { ChallengeController } from "./challenge.controller";

describe("ChallengeController", () => {
  let controller: ChallengeController;

  let createUseCase: CreateChallengeUseCase;
  let updateUseCase: UpdateChallengeUseCase;
  let findByIdUseCase: FindChallengeByIdUseCase;
  let queryUseCase: QueryChallengesUseCase;
  let interactUseCase: UserInteractChallengeUseCase;

  const CreateUseCaseMock = {
    execute: jest.fn(),
  };

  const UpdateUseCaseMock = {
    execute: jest.fn(),
  };

  const FindByIdUseCaseMock = {
    execute: jest.fn(),
  };

  const QueryChallengesUseCaseMock = {
    execute: jest.fn(),
  };

  const UserInteractChallengeUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeController],
      providers: [
        {
          provide: CreateChallengeUseCase,
          useValue: CreateUseCaseMock,
        },
        {
          provide: UpdateChallengeUseCase,
          useValue: UpdateUseCaseMock,
        },
        {
          provide: FindChallengeByIdUseCase,
          useValue: FindByIdUseCaseMock,
        },
        {
          provide: QueryChallengesUseCase,
          useValue: QueryChallengesUseCaseMock,
        },
        {
          provide: UserInteractChallengeUseCase,
          useValue: UserInteractChallengeUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get(ChallengeController);

    createUseCase = module.get(CreateChallengeUseCase);
    findByIdUseCase = module.get(FindChallengeByIdUseCase);
    updateUseCase = module.get(UpdateChallengeUseCase);
    queryUseCase = module.get(QueryChallengesUseCase);
    interactUseCase = module.get(UserInteractChallengeUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const challengeId = 2;
  const activityId = 1;

  describe("findById", () => {
    const inputMock = { activityId, challengeId };

    it("should call the execute method from FindChallengeByIdUseCase instance and return the challenge found", async () => {
      jest
        .spyOn(findByIdUseCase, "execute")
        .mockResolvedValue(EXISTING_FULL_CHALLENGE_MOCK);
      const challengeFound = await controller.findById(inputMock);

      expect(findByIdUseCase.execute).toHaveBeenCalledWith(challengeId);
      expect(challengeFound).toStrictEqual(EXISTING_FULL_CHALLENGE_MOCK);
    });

    it("should throw a BadRequestException when no challenge is found by the FindChallengeByIdUseCase", async () => {
      jest.spyOn(findByIdUseCase, "execute").mockResolvedValue(null);
      const expectedErrorMsg = t("en").challenge.notFound;

      try {
        await controller.findById(inputMock);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(expectedErrorMsg);
      }
    });

    it("should throw a BadRequestException if the challengeId passed in params has not a valid type", async () => {
      try {
        await controller.findById({
          challengeId: "A1",
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "challengeId: Invalid field",
        );
      }
    });
  });

  describe("query", () => {
    const search = {
      search: "sear",
      org: 1,
      pageNumber: 3,
      pageSize: 31,
    };

    const paginatedResult = new PaginatedItems(
      [EXISTING_FULL_CHALLENGE_MOCK],
      1,
      search.pageNumber,
      search.pageSize,
    );

    it("should call the execute method from FindChallengeByIdUseCase instance and return the challenge found", async () => {
      jest.spyOn(queryUseCase, "execute").mockResolvedValue(paginatedResult);

      const result = await controller.query(search, "en");

      expect(queryUseCase.execute).toHaveBeenCalledWith(search);
      expect(result).toStrictEqual(paginatedResult);
    });

    it("should throw a BadRequestException if the any prop passed in params has not a valid type", async () => {
      try {
        await controller.query(
          {
            ...search,
            search: 1,
          } as any,
          "en",
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "search: Invalid field",
        );
      }
    });
  });

  describe("create", () => {
    it("should call the execute method from FindChallengeByIdUseCase instance and return the challenge created", async () => {
      jest
        .spyOn(createUseCase, "execute")
        .mockResolvedValue(EXISTING_FULL_CHALLENGE_MOCK);

      const result = await controller.create(NON_EXISTING_CHALLENGE_MOCK);

      expect(createUseCase.execute).toHaveBeenCalledWith(
        NON_EXISTING_CHALLENGE_MOCK,
      );
      expect(result).toStrictEqual(EXISTING_FULL_CHALLENGE_MOCK);
    });

    it("should throw a BadRequestException if the body passed has unexpected data types", async () => {
      try {
        await controller.create({
          ...NON_EXISTING_CHALLENGE_MOCK,
          title: 1,
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "title: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the body is sent missing some required prop", async () => {
      try {
        await controller.create({
          organizationId: 1,
          rewardId: 1,
          title: "Lorem",
          description: "Ipsum Lorem",
          startAt: new Date(2005, 5, 22),
          endAt: new Date(2005, 6, 22),
          isPublic: false,
          bannerUrl: "http://url.com",
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toContain(
          "joinMethod: Required field",
        );
        expect((error as BadRequestException).message).toContain(
          "checkInEndOfDay: Required field",
        );
        expect((error as BadRequestException).message).toContain(
          "multipleCheckIns: Required field",
        );
        expect((error as BadRequestException).message).toContain(
          "checkInTypeCode: Invalid field",
        );
      }
    });
  });

  describe("update", () => {
    it("should call the execute method from UpdateChallengeUseCase instance and return the challenge updated", async () => {
      jest
        .spyOn(updateUseCase, "execute")
        .mockResolvedValue(EXISTING_FULL_CHALLENGE_MOCK);

      const result = await controller.update(EXISTING_CHALLENGE_MOCK);

      expect(updateUseCase.execute).toHaveBeenCalledWith({
        ...EXISTING_CHALLENGE_MOCK,
        createdAt: undefined,
        updatedAt: undefined,
      });
      expect(result).toStrictEqual(EXISTING_FULL_CHALLENGE_MOCK);
    });

    it("should throw a BadRequestException if the body passed has unexpected data types", async () => {
      try {
        await controller.update({
          ...EXISTING_CHALLENGE_MOCK,
          title: 1,
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "title: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the body is sent missing some required prop", async () => {
      try {
        await controller.update({
          id: 1,
          organizationId: 1,
          rewardId: 1,
          title: "Lorem",
          description: "Ipsum Lorem",
          startAt: new Date(2005, 5, 22),
          endAt: new Date(2005, 6, 22),
          isPublic: false,
          bannerUrl: "http://url.com",
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toContain(
          "joinMethod: Required field",
        );
        expect((error as BadRequestException).message).toContain(
          "checkInEndOfDay: Required field",
        );
        expect((error as BadRequestException).message).toContain(
          "multipleCheckIns: Required field",
        );
        expect((error as BadRequestException).message).toContain(
          "checkInTypeCode: Invalid field",
        );
      }
    });
  });

  describe("createUserInteraction", () => {
    it("should call the execute method from UserInteractChallengeUseCase instance and return the user challenge interaction created", async () => {
      jest
        .spyOn(interactUseCase, "execute")
        .mockResolvedValue(EXISTING_CHALLENGE_INTERACTION);

      const result = await controller.createUserInteraction(
        { challengeId: EXISTING_CHALLENGE_INTERACTION.challengeId },
        NON_EXISTING_CHALLENGE_INTERACTION,
      );

      expect(interactUseCase.execute).toHaveBeenCalledWith({
        ...NON_EXISTING_CHALLENGE_INTERACTION,
        challengeId: EXISTING_CHALLENGE_INTERACTION.challengeId,
      });
      expect(result).toStrictEqual(EXISTING_CHALLENGE_INTERACTION);
    });

    it("should throw a BadRequestException if the body passed has unexpected data types", async () => {
      try {
        await controller.createUserInteraction(
          { challengeId: EXISTING_CHALLENGE_INTERACTION.challengeId },
          {
            ...NON_EXISTING_CHALLENGE_INTERACTION,
            videoUrl: 123,
          } as any,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "videoUrl: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the challengeId passed in params has unexpected data types", async () => {
      try {
        await controller.createUserInteraction(
          { challengeId: "1A" } as any,
          NON_EXISTING_CHALLENGE_INTERACTION,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "challengeId: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the body is sent missing some required prop", async () => {
      try {
        await controller.createUserInteraction(
          { challengeId: EXISTING_CHALLENGE_INTERACTION.challengeId },
          {
            challengeId: 1,
            videoUrl: "https://video.com",
          } as any,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "userId: Invalid field",
        );
      }
    });
  });
});
