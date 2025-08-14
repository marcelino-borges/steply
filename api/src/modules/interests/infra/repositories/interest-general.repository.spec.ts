import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import { MOCK_INTEREST_GENERAL } from "@/modules/interests/__mocks__/interest-general.mock";
import { InterestGeneralRepository } from "./interest-general.repository";

describe("InterestGeneralRepository", () => {
  let repository: InterestGeneralRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterestGeneralRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    repository = module.get<InterestGeneralRepository>(InterestGeneralRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findAll", () => {
    it("should call prisma interestGeneral findMany with correct parameters", async () => {
      const findManySpy = jest.spyOn(prismaService.interestGeneral, "findMany");

      await repository.findAll("en");

      expect(findManySpy).toHaveBeenCalledWith({
        where: {
          lang: "en",
        },
        orderBy: {
          id: "asc",
        },
      });
    });

    it("should return all general interests from database", async () => {
      jest
        .spyOn(prismaService.interestGeneral, "findMany")
        .mockResolvedValue(MOCK_INTEREST_GENERAL);

      const result = await repository.findAll("en");

      expect(result).toEqual(MOCK_INTEREST_GENERAL);
    });
  });
});