import { Test, TestingModule } from "@nestjs/testing";
import { AddUserActivitiesUseCase } from "./add-user-activities.use-case";
import { USER_REPOSITORY_TOKEN } from "@/modules/users/infra/repositories/user.repository";

describe("AddUserActivitiesUseCase", () => {
  let useCase: AddUserActivitiesUseCase;
  let userRepository: any;

  beforeEach(async () => {
    const mockUserRepository = {
      addActivities: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddUserActivitiesUseCase,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<AddUserActivitiesUseCase>(AddUserActivitiesUseCase);
    userRepository = module.get(USER_REPOSITORY_TOKEN);
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    it("should call repository.addActivities with correct parameters", async () => {
      const userId = 1;
      const activityIds = [1, 2, 3];

      await useCase.execute(userId, activityIds);

      expect(userRepository.addActivities).toHaveBeenCalledWith(
        userId,
        activityIds,
      );
      expect(userRepository.addActivities).toHaveBeenCalledTimes(1);
    });

    it("should handle empty activity array", async () => {
      const userId = 1;
      const activityIds: number[] = [];

      await useCase.execute(userId, activityIds);

      expect(userRepository.addActivities).toHaveBeenCalledWith(
        userId,
        activityIds,
      );
    });

    it("should handle single activity", async () => {
      const userId = 1;
      const activityIds = [5];

      await useCase.execute(userId, activityIds);

      expect(userRepository.addActivities).toHaveBeenCalledWith(
        userId,
        activityIds,
      );
    });
  });
});
