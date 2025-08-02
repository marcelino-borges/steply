import { Test, TestingModule } from "@nestjs/testing";
import { UserGoalRepositoryInterface } from "@/modules/user-goals/infra/abstractions/user-goal-repository.interface";
import { USER_GOAL_REPOSITORY_TOKEN } from "@/modules/user-goals/infra/repositories/user-goal.repository";
import {
  USER_GOAL_REPOSITORY_MOCK,
  MOCK_USER_GOALS,
} from "@/modules/user-goals/__mocks__/user-goal.mock";
import { FindAllUserGoalsUseCase } from "./find-all-user-goals.use-case";

describe("FindAllUserGoalsUseCase", () => {
  let useCase: FindAllUserGoalsUseCase;
  let userGoalRepository: UserGoalRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllUserGoalsUseCase,
        {
          provide: USER_GOAL_REPOSITORY_TOKEN,
          useValue: USER_GOAL_REPOSITORY_MOCK,
        },
      ],
    }).compile();

    useCase = module.get<FindAllUserGoalsUseCase>(FindAllUserGoalsUseCase);
    userGoalRepository = module.get<UserGoalRepositoryInterface>(
      USER_GOAL_REPOSITORY_TOKEN,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("execute", () => {
    it("should call user goal repository findAll method", async () => {
      jest
        .spyOn(userGoalRepository, "findAll")
        .mockResolvedValue(MOCK_USER_GOALS);

      await useCase.execute();

      expect(userGoalRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should return all user goals from repository", async () => {
      jest
        .spyOn(userGoalRepository, "findAll")
        .mockResolvedValue(MOCK_USER_GOALS);

      const result = await useCase.execute();

      expect(result).toEqual(MOCK_USER_GOALS);
    });
  });
});
