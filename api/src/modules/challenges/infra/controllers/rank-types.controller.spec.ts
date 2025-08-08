import { Test, TestingModule } from "@nestjs/testing";

import { BadRequestException } from "@nestjs/common";
import { t } from "@/core/application/locales";
import { RankTypeController } from "./rank-type.controller";
import { CreateRankTypeUseCase } from "@/modules/challenges/application/use-cases/rank-type/create-rank-type.use-case";
import { UpdateRankTypeUseCase } from "@/modules/challenges/application/use-cases/rank-type/update-rank-type.use-case";
import { DeleteRankTypeUseCase } from "@/modules/challenges/application/use-cases/rank-type/delete-rank-type.use-case";
import {
  EXISTING_RANK_TYPE_MOCK,
  NON_EXISTING_RANK_TYPE_MOCK,
} from "../../__mocks__/rank-type.mock";

describe("RankTypeController", () => {
  let controller: RankTypeController;

  let createUseCase: CreateRankTypeUseCase;
  let updateUseCase: UpdateRankTypeUseCase;
  let deleteUseCase: DeleteRankTypeUseCase;

  const CreateUseCaseMock = {
    execute: jest.fn(),
  };

  const UpdateUseCaseMock = {
    execute: jest.fn(),
  };

  const DeleteRankTypeUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankTypeController],
      providers: [
        {
          provide: CreateRankTypeUseCase,
          useValue: CreateUseCaseMock,
        },
        {
          provide: UpdateRankTypeUseCase,
          useValue: UpdateUseCaseMock,
        },
        {
          provide: DeleteRankTypeUseCase,
          useValue: DeleteRankTypeUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get(RankTypeController);

    createUseCase = module.get(CreateRankTypeUseCase);
    updateUseCase = module.get(UpdateRankTypeUseCase);
    deleteUseCase = module.get(DeleteRankTypeUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const challengeId = 3;
  const rankTypeId = 1;

  describe("create", () => {
    it("should call the execute method from FindRankTypeByIdUseCase instance and return the activity created", async () => {
      jest
        .spyOn(createUseCase, "execute")
        .mockResolvedValue(EXISTING_RANK_TYPE_MOCK);

      const result = await controller.create(NON_EXISTING_RANK_TYPE_MOCK, {
        challengeId,
      });

      expect(createUseCase.execute).toHaveBeenCalledWith(
        NON_EXISTING_RANK_TYPE_MOCK,
        challengeId,
      );
      expect(result).toStrictEqual(EXISTING_RANK_TYPE_MOCK);
    });

    it("should throw a BadRequestException if the body passed has unexpected data types", async () => {
      try {
        await controller.create(
          {
            ...EXISTING_RANK_TYPE_MOCK,
            title: 1,
          } as any,
          { challengeId },
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "title: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the challengeId sent in params has an invalid type", async () => {
      try {
        await controller.create(NON_EXISTING_RANK_TYPE_MOCK, {
          challengeId: true,
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "challengeId: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the challengeId is not found in params", async () => {
      try {
        await controller.create(NON_EXISTING_RANK_TYPE_MOCK, {} as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "challengeId: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the body is sent missing some required prop", async () => {
      try {
        await controller.create(
          {
            description: "Rank description",
            minInteractions: 10,
            rank: 1,
          } as any,
          { challengeId: 1 } as any,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "title: Required field",
        );
      }
    });

    it("should throw a BadRequestException if the body is sent with some prop of an invalid type", async () => {
      try {
        await controller.create(
          {
            title: "Rank title",
            description: "Rank description",
            minInteractions: 10,
            rank: 1,
          } as any,
          { challengeId } as any,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          /title: Invalid field/i,
        );
        expect((error as BadRequestException).message).toMatch(
          /startAt: Invalid field/i,
        );
      }
    });
  });

  describe("update", () => {
    it("should call the execute method from UpdateRankTypeUseCase instance and return the activity updated", async () => {
      jest
        .spyOn(updateUseCase, "execute")
        .mockResolvedValue(EXISTING_RANK_TYPE_MOCK);

      const result = await controller.update(EXISTING_RANK_TYPE_MOCK, {
        challengeId,
      });

      const { challengeId: newChallengeId, ...rankType } = {
        ...EXISTING_RANK_TYPE_MOCK,
        challengeId,
      };

      expect(updateUseCase.execute).toHaveBeenCalledWith(
        {
          ...rankType,
          createdAt: undefined,
          updatedAt: undefined,
        },
        newChallengeId,
      );
      expect(result).toStrictEqual(EXISTING_RANK_TYPE_MOCK);
    });

    it("should throw a BadRequestException if the body passed has unexpected data types", async () => {
      try {
        await controller.update(
          {
            ...EXISTING_RANK_TYPE_MOCK,
            title: 1,
          } as any,
          { challengeId },
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "title: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the challengeId sent in params has an invalid type", async () => {
      try {
        await controller.update(EXISTING_RANK_TYPE_MOCK, {
          challengeId: true,
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "challengeId: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the challengeId is not found in params", async () => {
      try {
        await controller.update(EXISTING_RANK_TYPE_MOCK, {} as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "challengeId: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the body is sent missing some required prop", async () => {
      try {
        await controller.update(
          {
            id: 2,
            createdAt: new Date(2005, 5, 22),
            updatedAt: new Date(2005, 5, 22),
            title: "Rank title",
            description: "Rank description",
            minInteractions: 10,
            rank: 1,
          } as any,
          { challengeId: true } as any,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "title: Required field",
        );
      }
    });

    it("should throw a BadRequestException if the body is sent with some prop of an invalid type", async () => {
      try {
        await controller.update(
          {
            id: 2,
            createdAt: new Date(2005, 5, 22),
            updatedAt: new Date(2005, 5, 22),
            title: "Rank title",
            description: "Rank description",
            minInteractions: 10,
            rank: 1,
          } as any,
          { challengeId } as any,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          /description: Invalid field/i,
        );
        expect((error as BadRequestException).message).toMatch(
          /startAt: Invalid date/i,
        );
      }
    });
  });

  describe("delete", () => {
    const inputMock = { rankTypeId, challengeId };

    it("should call the execute method from DeleteRankTypeUseCase instance", async () => {
      jest.spyOn(deleteUseCase, "execute").mockResolvedValue();
      await controller.delete(inputMock);

      expect(deleteUseCase.execute).toHaveBeenCalledWith(
        rankTypeId,
        challengeId,
      );
    });

    it("should throw a BadRequestException when no activity is found by the FindRankTypeByIdUseCase", async () => {
      jest.spyOn(deleteUseCase, "execute").mockResolvedValue();
      const expectedErrorMsg = t("en").activity.notFound;

      try {
        await controller.delete(inputMock);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(expectedErrorMsg);
      }
    });

    it("should throw a BadRequestException if the rankTypeId or challengeId passed in params has not a valid type", async () => {
      try {
        await controller.delete({
          rankTypeId: "A1",
          challengeId: "@x2",
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "rankTypeId: Invalid field; ",
        );
        expect((error as BadRequestException).message).toMatch(
          "challengeId: Invalid field",
        );
      }
    });
  });
});
