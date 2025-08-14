import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import { MOCK_INTEREST_ACTIVITIES } from "@/modules/interests/__mocks__/interest-activity.mock";
import { InterestActivityRepository } from "./interest-activity.repository";

describe("InterestActivityRepository", () => {
  let repository: InterestActivityRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterestActivityRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    repository = module.get<InterestActivityRepository>(InterestActivityRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findAll", () => {
    it("should call prisma interestActivity findMany with correct parameters", async () => {
      const findManySpy = jest.spyOn(prismaService.interestActivity, "findMany");

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

    it("should return all interest activities from database", async () => {
      jest
        .spyOn(prismaService.interestActivity, "findMany")
        .mockResolvedValue(MOCK_INTEREST_ACTIVITIES);

      const result = await repository.findAll("en");

      expect(result).toEqual(MOCK_INTEREST_ACTIVITIES);
    });
  });
});