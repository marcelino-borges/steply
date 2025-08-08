import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import {
  EXISTING_RANK_TYPE_MOCK,
  NON_EXISTING_RANK_TYPE_MOCK,
} from "@/modules/challenges/__mocks__/rank-type.mock";
import { ActivitiesSuggestionsRepository } from "./suggested-activities.repository";
import { EXISTING_SUGGESTED_ACTIVITY_MOCK } from "../../__mocks__/suggested-activities.mock";
import { RankTypesSuggestionsRepository } from "./suggested-rank-types.repository";
import { EXISTING_SUGGESTED_RANK_TYPE_MOCK } from "../../__mocks__/suggested-rank-types.mock";

describe("RankTypeRepository", () => {
  let prismaService: PrismaService;
  let repo: RankTypesSuggestionsRepository;
  const lang = "en";
  const rankTypes = [
    EXISTING_SUGGESTED_RANK_TYPE_MOCK,
    EXISTING_SUGGESTED_RANK_TYPE_MOCK,
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankTypesSuggestionsRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    prismaService = module.get(PrismaService);
    repo = module.get(RankTypesSuggestionsRepository);
  });

  describe("findAll", () => {
    it("should call the database function to find all suggested rank types", async () => {
      const spy = jest
        .spyOn(prismaService.suggestedRankType, "findMany")
        .mockResolvedValue(rankTypes);

      await repo.findAll(lang);

      expect(spy).toHaveBeenCalledWith({
        where: {
          active: true,
          lang,
        },
      });
    });

    it("should return the suggested rank types found on database", async () => {
      jest
        .spyOn(prismaService.suggestedRankType, "findMany")
        .mockResolvedValue(rankTypes);

      const result = await repo.findAll(lang);

      expect(result).toStrictEqual(rankTypes);
    });
  });
});
