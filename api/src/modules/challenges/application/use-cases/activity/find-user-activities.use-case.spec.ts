import { Test, TestingModule } from "@nestjs/testing";

import { FindUserActivitiesUseCase } from "./find-user-activities.use-case";
import { ACTIVITY_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/activity.repository";
import { ACTIVITY_REPOSITORY_MOCK } from "@/modules/challenges/__mocks__/activity.mock";

describe("FindUserActivitiesUseCase", () => {
  let useCase: FindUserActivitiesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserActivitiesUseCase,
        {
          provide: ACTIVITY_REPOSITORY_TOKEN,
          useValue: ACTIVITY_REPOSITORY_MOCK,
        },
      ],
    }).compile();

    useCase = module.get<FindUserActivitiesUseCase>(FindUserActivitiesUseCase);
  });

  describe("execute", () => {
    it("should call repository findByUserId with correct userId", async () => {
      const userId = 1;

      await useCase.execute(userId);

      expect(ACTIVITY_REPOSITORY_MOCK.findByUserId).toHaveBeenCalledWith(userId);
    });

    it("should return user activities from repository", async () => {
      const userId = 1;
      const mockActivities = [
        {
          id: 1,
          title: "Morning Workout",
          description: "30 minute workout",
          startAt: new Date(),
          endAt: new Date(),
          challengeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      ACTIVITY_REPOSITORY_MOCK.findByUserId.mockResolvedValue(mockActivities);

      const result = await useCase.execute(userId);

      expect(result).toEqual(mockActivities);
    });
  });
});