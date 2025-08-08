import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import {
  EXISTING_REWARD,
  NON_EXISTING_REWARD,
} from "@/modules/challenges/__mocks__/reward.mock";
import { RewardRepository } from "./reward.repository";

describe("RewardRepository", () => {
  let prismaService: PrismaService;
  let repo: RewardRepository;
  const challengeId = EXISTING_REWARD.challengeId;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RewardRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    prismaService = module.get(PrismaService);
    repo = module.get(RewardRepository);
  });

  describe("create", () => {
    it("should call the database function to create a reward", async () => {
      const createSpy = jest
        .spyOn(prismaService.reward, "create")
        .mockResolvedValue(EXISTING_REWARD);

      await repo.create(NON_EXISTING_REWARD, challengeId);

      expect(createSpy).toHaveBeenCalledWith({
        data: {
          ...NON_EXISTING_REWARD,
          challengeId: challengeId,
        },
      });
    });

    it("should return the reward created on database", async () => {
      jest
        .spyOn(prismaService.reward, "create")
        .mockResolvedValue(EXISTING_REWARD);

      const result = await repo.create(NON_EXISTING_REWARD, challengeId);

      expect(result).toStrictEqual(EXISTING_REWARD);
    });
  });

  describe("update", () => {
    const updatedData = {
      ...EXISTING_REWARD,
      name: "Updated title",
    };

    it("should call the database function to update a reward", async () => {
      const updateSpy = jest
        .spyOn(prismaService.reward, "update")
        .mockResolvedValue(updatedData);

      await repo.update(EXISTING_REWARD);

      expect(updateSpy).toHaveBeenCalledWith({
        where: {
          id: EXISTING_REWARD.id,
        },
        data: EXISTING_REWARD,
      });
    });

    it("should return the reward updated on database", async () => {
      jest.spyOn(prismaService.reward, "update").mockResolvedValue(updatedData);

      const result = await repo.update(updatedData);

      expect(result).toStrictEqual(updatedData);
    });
  });

  describe("delete", () => {
    const id = 1;

    it("should call the database function to delete an reward by id", async () => {
      const findByIdSpy = jest.spyOn(prismaService.reward, "delete");

      await repo.delete(id, challengeId);

      expect(findByIdSpy).toHaveBeenCalledWith({
        where: {
          id,
          challengeId,
        },
      });
    });
  });
});
