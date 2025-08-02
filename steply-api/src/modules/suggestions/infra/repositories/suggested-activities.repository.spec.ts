import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import { EXISTING_RANK_TYPE_MOCK } from "@/modules/challenges/__mocks__/rank-type.mock";
import { EXISTING_SUGGESTED_ACTIVITY_MOCK } from "@/modules/suggestions/__mocks__/suggested-activities.mock";
import { ActivitiesSuggestionsRepository } from "./suggested-activities.repository";

describe("RankTypeRepository", () => {
  let prismaService: PrismaService;
  let repo: ActivitiesSuggestionsRepository;
  const lang = "en";
  const activities = [
    EXISTING_SUGGESTED_ACTIVITY_MOCK,
    EXISTING_SUGGESTED_ACTIVITY_MOCK,
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivitiesSuggestionsRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    prismaService = module.get(PrismaService);
    repo = module.get(ActivitiesSuggestionsRepository);
  });

  describe("findAll", () => {
    it("should call the database function to find all suggested activities", async () => {
      const spy = jest
        .spyOn(prismaService.suggestedActivity, "findMany")
        .mockResolvedValue(activities);

      await repo.findAll(lang);

      expect(spy).toHaveBeenCalledWith({
        where: {
          active: true,
          lang,
        },
      });
    });

    it("should return the suggested activities found on database", async () => {
      jest
        .spyOn(prismaService.suggestedActivity, "findMany")
        .mockResolvedValue(activities);

      const result = await repo.findAll(lang);

      expect(result).toStrictEqual(activities);
    });
  });
});
