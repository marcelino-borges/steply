import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import { MOCK_GENDERS } from "@/modules/genders/__mocks__/gender.mock";
import { GenderRepository } from "./gender.repository";

describe("GenderRepository", () => {
  let repository: GenderRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenderRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    repository = module.get<GenderRepository>(GenderRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findAll", () => {
    it("should call prisma gender findMany with correct parameters", async () => {
      const findManySpy = jest.spyOn(prismaService.gender, "findMany");

      await repository.findAll();

      expect(findManySpy).toHaveBeenCalledWith({
        orderBy: {
          id: "asc",
        },
      });
    });

    it("should return all genders from database", async () => {
      jest
        .spyOn(prismaService.gender, "findMany")
        .mockResolvedValue(MOCK_GENDERS);

      const result = await repository.findAll();

      expect(result).toEqual(MOCK_GENDERS);
    });
  });
});
