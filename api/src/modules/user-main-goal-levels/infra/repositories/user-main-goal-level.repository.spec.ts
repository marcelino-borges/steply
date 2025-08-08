import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import { UserMainGoalLevelRepository } from "@/modules/user-main-goal-levels/infra/repositories/user-main-goal-level.repository";
import { MOCK_USER_MAIN_GOAL_LEVELS } from "@/modules/user-main-goal-levels/__mocks__/user-main-goal-level.mock";

describe("UserMainGoalLevelRepository", () => {
  let repository: UserMainGoalLevelRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserMainGoalLevelRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    repository = module.get<UserMainGoalLevelRepository>(
      UserMainGoalLevelRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findAll", () => {
    it("should call prisma userMainGoalLevel findMany with correct parameters", async () => {
      const findManySpy = jest.spyOn(
        prismaService.userMainGoalLevel,
        "findMany",
      );

      await repository.findAll();

      expect(findManySpy).toHaveBeenCalledWith({
        orderBy: {
          id: "asc",
        },
      });
    });

    it("should return all user main goal levels from database", async () => {
      jest
        .spyOn(prismaService.userMainGoalLevel, "findMany")
        .mockResolvedValue(MOCK_USER_MAIN_GOAL_LEVELS);

      const result = await repository.findAll();

      expect(result).toEqual(MOCK_USER_MAIN_GOAL_LEVELS);
    });
  });
});
