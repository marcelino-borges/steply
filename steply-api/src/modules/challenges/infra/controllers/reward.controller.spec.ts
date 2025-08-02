import { Test, TestingModule } from "@nestjs/testing";

import { BadRequestException } from "@nestjs/common";
import { t } from "@/core/application/locales";
import { EXISTING_RANK_TYPE_MOCK } from "../../__mocks__/rank-type.mock";
import { RewardController } from "./reward.controller";
import { FindAllRewardsUseCase } from "../../application/use-cases/reward/find-all-rewards.use-case";
import { CreateRewardUseCase } from "../../application/use-cases/reward/create-reward.use-case";
import { UpdateRewardUseCase } from "../../application/use-cases/reward/update-reward.use-case";
import { DeleteRewardUseCase } from "../../application/use-cases/reward/delete-reward.use-case";
import {
  EXISTING_REWARD,
  NON_EXISTING_REWARD,
} from "../../__mocks__/reward.mock";

describe("RewardController", () => {
  let controller: RewardController;

  let createUseCase: CreateRewardUseCase;
  let updateUseCase: UpdateRewardUseCase;
  let deleteUseCase: DeleteRewardUseCase;
  let findAllUseCase: FindAllRewardsUseCase;

  const CreateUseCaseMock = {
    execute: jest.fn(),
  };

  const UpdateUseCaseMock = {
    execute: jest.fn(),
  };

  const DeleteRewardUseCaseMock = {
    execute: jest.fn(),
  };

  const FindAllRewardsUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardController],
      providers: [
        {
          provide: CreateRewardUseCase,
          useValue: CreateUseCaseMock,
        },
        {
          provide: UpdateRewardUseCase,
          useValue: UpdateUseCaseMock,
        },
        {
          provide: DeleteRewardUseCase,
          useValue: DeleteRewardUseCaseMock,
        },
        {
          provide: FindAllRewardsUseCase,
          useValue: FindAllRewardsUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get(RewardController);

    createUseCase = module.get(CreateRewardUseCase);
    updateUseCase = module.get(UpdateRewardUseCase);
    deleteUseCase = module.get(DeleteRewardUseCase);
    findAllUseCase = module.get(FindAllRewardsUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const challengeId = 3;
  const rewardId = 1;

  describe("create", () => {
    it("should call the execute method from FindRankTypeByIdUseCase instance and return the activity created", async () => {
      jest.spyOn(createUseCase, "execute").mockResolvedValue(EXISTING_REWARD);

      const result = await controller.create(NON_EXISTING_REWARD, {
        challengeId,
      });

      expect(createUseCase.execute).toHaveBeenCalledWith(
        NON_EXISTING_REWARD,
        challengeId,
      );
      expect(result).toStrictEqual(EXISTING_REWARD);
    });

    it("should throw a BadRequestException if the body passed has unexpected data types", async () => {
      try {
        await controller.create(
          {
            ...EXISTING_REWARD,
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
        await controller.create(NON_EXISTING_REWARD, {
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
        await controller.create(NON_EXISTING_REWARD, {} as any);
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
            rewardTypeId: 1,
            deliveryDetails: "Details",
            name: "Reward",
            description: "Desc",
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
            rewardTypeId: 1,
            deliveryDetails: "Details",
            name: "Reward",
            description: "Desc",
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
    it("should call the execute method from UpdateRewardUseCase instance and return the activity updated", async () => {
      jest.spyOn(updateUseCase, "execute").mockResolvedValue(EXISTING_REWARD);

      const result = await controller.update(EXISTING_REWARD, {
        challengeId,
      });

      const { challengeId: newChallengeId, ...reward } = {
        ...EXISTING_REWARD,
        challengeId,
      };

      expect(updateUseCase.execute).toHaveBeenCalledWith({
        ...reward,
        challengeId: newChallengeId,
        createdAt: undefined,
        updatedAt: undefined,
      });
      expect(result).toStrictEqual(EXISTING_REWARD);
    });

    it("should throw a BadRequestException if the body passed has unexpected data types", async () => {
      try {
        await controller.update(
          {
            ...EXISTING_RANK_TYPE_MOCK,
            name: 1,
          } as any,
          { challengeId },
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "name: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the challengeId sent in params has an invalid type", async () => {
      try {
        await controller.update(EXISTING_REWARD, {
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
        await controller.update(EXISTING_REWARD, {} as any);
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
            rewardTypeId: 1,
            deliveryDetails: "Details",
            name: "Reward",
            description: "Desc",
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
            rewardTypeId: 1,
            deliveryDetails: "Details",
            name: "Reward",
            description: "Desc",
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
    const inputMock = { rewardId, challengeId };

    it("should call the execute method from DeleteRewardUseCase instance", async () => {
      jest.spyOn(deleteUseCase, "execute").mockResolvedValue();
      await controller.delete(inputMock);

      expect(deleteUseCase.execute).toHaveBeenCalledWith(rewardId, challengeId);
    });

    it("should throw a BadRequestException when no activity is found by the DeleteRewardUseCase", async () => {
      jest.spyOn(deleteUseCase, "execute").mockResolvedValue();
      const expectedErrorMsg = t("en").activity.notFound;

      try {
        await controller.delete(inputMock);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(expectedErrorMsg);
      }
    });

    it("should throw a BadRequestException if the rawardId or challengeId passed in params has not a valid type", async () => {
      try {
        await controller.delete({
          rawardId: "A1",
          challengeId: "@x2",
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          /rewardId: Invalid field/i,
        );
        expect((error as BadRequestException).message).toMatch(
          /challengeId: Invalid field/i,
        );
      }
    });
  });

  describe("findAll", () => {
    it("should call the execute method from FindAllRewardsUseCase instance", async () => {
      jest
        .spyOn(findAllUseCase, "execute")
        .mockResolvedValue([EXISTING_REWARD]);
      await controller.findAll({ challengeId });

      expect(findAllUseCase.execute).toHaveBeenCalledWith(challengeId);
    });

    it("should throw a BadRequestException when no activity is found by the FindRewardByIdUseCase", async () => {
      jest
        .spyOn(findAllUseCase, "execute")
        .mockResolvedValue([EXISTING_REWARD]);
      const expectedErrorMsg = t("en").activity.notFound;

      try {
        await controller.findAll({ challengeId });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(expectedErrorMsg);
      }
    });

    it("should throw a BadRequestException if the rawardId or challengeId passed in params has not a valid type", async () => {
      try {
        await controller.findAll({
          challengeId: "@x2",
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          /challengeId: Invalid field/i,
        );
      }
    });
  });
});
