import { Test, TestingModule } from "@nestjs/testing";
import { FindAllUserMainGoalLevelsUseCase } from "@/modules/user-main-goal-levels/application/use-cases/find-all-user-main-goal-levels.use-case";
import { UserMainGoalLevelRepositoryInterface } from "@/modules/user-main-goal-levels/infra/abstractions/user-main-goal-level-repository.interface";
import { USER_MAIN_GOAL_LEVEL_REPOSITORY_TOKEN } from "@/modules/user-main-goal-levels/infra/repositories/user-main-goal-level.repository";
import { USER_MAIN_GOAL_LEVEL_REPOSITORY_MOCK, MOCK_USER_MAIN_GOAL_LEVELS } from "@/modules/user-main-goal-levels/__mocks__/user-main-goal-level.mock";

describe("FindAllUserMainGoalLevelsUseCase", () => {
  let useCase: FindAllUserMainGoalLevelsUseCase;
  let userMainGoalLevelRepository: UserMainGoalLevelRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllUserMainGoalLevelsUseCase,
        {
          provide: USER_MAIN_GOAL_LEVEL_REPOSITORY_TOKEN,
          useValue: USER_MAIN_GOAL_LEVEL_REPOSITORY_MOCK,
        },
      ],
    }).compile();

    useCase = module.get<FindAllUserMainGoalLevelsUseCase>(FindAllUserMainGoalLevelsUseCase);
    userMainGoalLevelRepository = module.get<UserMainGoalLevelRepositoryInterface>(USER_MAIN_GOAL_LEVEL_REPOSITORY_TOKEN);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("execute", () => {
    it("should call user main goal level repository findAll method", async () => {
      jest.spyOn(userMainGoalLevelRepository, "findAll").mockResolvedValue(MOCK_USER_MAIN_GOAL_LEVELS);

      await useCase.execute();

      expect(userMainGoalLevelRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should return all user main goal levels from repository", async () => {
      jest.spyOn(userMainGoalLevelRepository, "findAll").mockResolvedValue(MOCK_USER_MAIN_GOAL_LEVELS);

      const result = await useCase.execute();

      expect(result).toEqual(MOCK_USER_MAIN_GOAL_LEVELS);
    });
  });
});