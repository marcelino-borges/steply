import { Test, TestingModule } from "@nestjs/testing";
import { UserMainGoalLevelController } from "@/modules/user-main-goal-levels/infra/controllers/user-main-goal-level.controller";
import { FindAllUserMainGoalLevelsUseCase } from "@/modules/user-main-goal-levels/application/use-cases/find-all-user-main-goal-levels.use-case";
import { MOCK_USER_MAIN_GOAL_LEVELS } from "@/modules/user-main-goal-levels/__mocks__/user-main-goal-level.mock";

describe("UserMainGoalLevelController", () => {
  let controller: UserMainGoalLevelController;
  let findAllUserMainGoalLevelsUseCase: FindAllUserMainGoalLevelsUseCase;

  const FindAllUserMainGoalLevelsUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMainGoalLevelController],
      providers: [
        {
          provide: FindAllUserMainGoalLevelsUseCase,
          useValue: FindAllUserMainGoalLevelsUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get<UserMainGoalLevelController>(
      UserMainGoalLevelController,
    );
    findAllUserMainGoalLevelsUseCase =
      module.get<FindAllUserMainGoalLevelsUseCase>(
        FindAllUserMainGoalLevelsUseCase,
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findAll", () => {
    it("should call the execute method from FindAllUserMainGoalLevelsUseCase and return all user main goal levels", async () => {
      jest
        .spyOn(findAllUserMainGoalLevelsUseCase, "execute")
        .mockResolvedValue(MOCK_USER_MAIN_GOAL_LEVELS);

      const result = await controller.findAll();

      expect(findAllUserMainGoalLevelsUseCase.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MOCK_USER_MAIN_GOAL_LEVELS);
    });
  });
});
