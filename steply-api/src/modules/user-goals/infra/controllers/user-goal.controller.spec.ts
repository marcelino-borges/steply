import { Test, TestingModule } from "@nestjs/testing";
import { FindAllUserGoalsUseCase } from "@/modules/user-goals/application/use-cases/find-all-user-goals.use-case";
import { MOCK_USER_GOALS } from "@/modules/user-goals/__mocks__/user-goal.mock";
import { UserGoalController } from "./user-goal.controller";

describe("UserGoalController", () => {
  let controller: UserGoalController;
  let findAllUserGoalsUseCase: FindAllUserGoalsUseCase;

  const FindAllUserGoalsUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGoalController],
      providers: [
        {
          provide: FindAllUserGoalsUseCase,
          useValue: FindAllUserGoalsUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get<UserGoalController>(UserGoalController);
    findAllUserGoalsUseCase = module.get<FindAllUserGoalsUseCase>(
      FindAllUserGoalsUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findAll", () => {
    it("should call the execute method from FindAllUserGoalsUseCase and return all user goals", async () => {
      jest
        .spyOn(findAllUserGoalsUseCase, "execute")
        .mockResolvedValue(MOCK_USER_GOALS);

      const result = await controller.findAll();

      expect(findAllUserGoalsUseCase.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MOCK_USER_GOALS);
    });
  });
});
