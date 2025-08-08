import { Test, TestingModule } from "@nestjs/testing";
import { RemoveUserActivitiesUseCase } from "./remove-user-activities.use-case";
import { USER_REPOSITORY_TOKEN } from "@/modules/users/infra/repositories/user.repository";

describe("RemoveUserActivitiesUseCase", () => {
  let useCase: RemoveUserActivitiesUseCase;
  let userRepository: any;

  beforeEach(async () => {
    const mockUserRepository = {
      removeActivities: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveUserActivitiesUseCase,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<RemoveUserActivitiesUseCase>(
      RemoveUserActivitiesUseCase,
    );
    userRepository = module.get(USER_REPOSITORY_TOKEN);
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    it("should call repository.removeActivities with correct parameters", async () => {
      const userId = 1;
      const activityIds = [1, 2, 3];

      await useCase.execute(userId, activityIds);

      expect(userRepository.removeActivities).toHaveBeenCalledWith(
        userId,
        activityIds,
      );
      expect(userRepository.removeActivities).toHaveBeenCalledTimes(1);
    });

    it("should handle empty activity array", async () => {
      const userId = 1;
      const activityIds: number[] = [];

      await useCase.execute(userId, activityIds);

      expect(userRepository.removeActivities).toHaveBeenCalledWith(
        userId,
        activityIds,
      );
    });

    it("should handle single activity", async () => {
      const userId = 1;
      const activityIds = [5];

      await useCase.execute(userId, activityIds);

      expect(userRepository.removeActivities).toHaveBeenCalledWith(
        userId,
        activityIds,
      );
    });

    it("should handle multiple activities", async () => {
      const userId = 2;
      const activityIds = [10, 20, 30, 40, 50];

      await useCase.execute(userId, activityIds);

      expect(userRepository.removeActivities).toHaveBeenCalledWith(
        userId,
        activityIds,
      );
    });
  });
});
