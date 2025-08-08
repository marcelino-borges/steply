import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import {
  EXISTING_RANK_TYPE_MOCK,
  NON_EXISTING_RANK_TYPE_MOCK,
} from "@/modules/challenges/__mocks__/rank-type.mock";
import { RankTypeRepository } from "./rank-type.repository";

describe("RankTypeRepository", () => {
  let prismaService: PrismaService;
  let repo: RankTypeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankTypeRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    prismaService = module.get(PrismaService);
    repo = module.get(RankTypeRepository);
  });

  describe("create", () => {
    it("should call the database function to create a rank type", async () => {
      const createSpy = jest
        .spyOn(prismaService.rankType, "create")
        .mockResolvedValue(EXISTING_RANK_TYPE_MOCK);

      await repo.create(
        NON_EXISTING_RANK_TYPE_MOCK,
        EXISTING_RANK_TYPE_MOCK.challengeId,
      );

      expect(createSpy).toHaveBeenCalledWith({
        data: {
          ...NON_EXISTING_RANK_TYPE_MOCK,
          challengeId: EXISTING_RANK_TYPE_MOCK.challengeId,
        },
      });
    });

    it("should return the challenge created on database", async () => {
      jest
        .spyOn(prismaService.rankType, "create")
        .mockResolvedValue(EXISTING_RANK_TYPE_MOCK);

      const result = await repo.create(
        NON_EXISTING_RANK_TYPE_MOCK,
        EXISTING_RANK_TYPE_MOCK.id,
      );

      expect(result).toStrictEqual(EXISTING_RANK_TYPE_MOCK);
    });
  });

  describe("update", () => {
    const updatedData = {
      ...EXISTING_RANK_TYPE_MOCK,
      title: "Updated title",
    };

    it("should call the database function to update a challenge", async () => {
      const updateSpy = jest
        .spyOn(prismaService.rankType, "update")
        .mockResolvedValue(updatedData);

      await repo.update(
        EXISTING_RANK_TYPE_MOCK,
        EXISTING_RANK_TYPE_MOCK.challengeId,
      );

      expect(updateSpy).toHaveBeenCalledWith({
        where: {
          id: EXISTING_RANK_TYPE_MOCK.id,
          challengeId: EXISTING_RANK_TYPE_MOCK.challengeId,
        },
        data: EXISTING_RANK_TYPE_MOCK,
      });
    });

    it("should return the challenge updated on database", async () => {
      jest
        .spyOn(prismaService.rankType, "update")
        .mockResolvedValue(updatedData);

      const result = await repo.update(updatedData, updatedData.challengeId);

      expect(result).toStrictEqual(updatedData);
    });
  });

  describe("delete", () => {
    const id = 1;

    it("should call the database function to delete a rank type by rankTypeId and challengeId", async () => {
      const findByIdSpy = jest.spyOn(prismaService.rankType, "delete");

      await repo.delete(id, EXISTING_RANK_TYPE_MOCK.challengeId);

      expect(findByIdSpy).toHaveBeenCalledWith({
        where: {
          id,
          challengeId: EXISTING_RANK_TYPE_MOCK.challengeId,
        },
      });
    });
  });
});
