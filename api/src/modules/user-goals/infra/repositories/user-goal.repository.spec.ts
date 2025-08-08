import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import { MOCK_USER_GOALS } from "@/modules/user-goals/__mocks__/user-goal.mock";
import { UserGoalRepository } from "./user-goal.repository";

describe("UserGoalRepository", () => {
  let repository: UserGoalRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserGoalRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    repository = module.get<UserGoalRepository>(UserGoalRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findAll", () => {
    it("should call prisma userGoal findMany with correct parameters", async () => {
      const findManySpy = jest.spyOn(prismaService.userGoal, "findMany");

      await repository.findAll();

      expect(findManySpy).toHaveBeenCalledWith({
        orderBy: {
          id: "asc",
        },
      });
    });

    it("should return all user goals from database", async () => {
      jest
        .spyOn(prismaService.userGoal, "findMany")
        .mockResolvedValue(MOCK_USER_GOALS);

      const result = await repository.findAll();

      expect(result).toEqual(MOCK_USER_GOALS);
    });
  });
});
