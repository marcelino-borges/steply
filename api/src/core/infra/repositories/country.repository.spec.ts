import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";

import { CountryRepository } from "./country.repository";
import { EXISTING_COUNTRY_MOCK } from "@/core/__mocks__/country.mock";

describe("RankTypeRepository", () => {
  let prismaService: PrismaService;
  let repo: CountryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    prismaService = module.get(PrismaService);
    repo = module.get(CountryRepository);
  });

  describe("findAll", () => {
    it("should call the database function to find all countries", async () => {
      const spy = jest
        .spyOn(prismaService.country, "findMany")
        .mockResolvedValue([EXISTING_COUNTRY_MOCK] as any);

      await repo.findAll();

      expect(spy).toHaveBeenCalledWith({
        where: {
          active: true,
        },
        select: {
          id: true,
          abbreviation: true,
          name: true,
          phoneCode: true,
        },
      });
    });

    it("should return the activity created on database", async () => {
      jest
        .spyOn(prismaService.country, "findMany")
        .mockResolvedValue([EXISTING_COUNTRY_MOCK] as any);

      const result = await repo.findAll();

      expect(result).toStrictEqual([EXISTING_COUNTRY_MOCK]);
    });
  });
});
