import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  ACTIVITY_REPOSITORY_TOKEN,
  ActivityRepository,
} from "@/modules/challenges/infra/repositories/activity.repository";
import { ACTIVITY_REPO_MOCK } from "@/modules/challenges/__mocks__/activity.mock";
import { FindActivityByIdUseCase } from "./find-activity-by-id.use-case";

describe("FindActivityByIdUseCase", () => {
  let repo: ActivityRepository;
  let useCase: FindActivityByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        FindActivityByIdUseCase,
        {
          provide: ACTIVITY_REPOSITORY_TOKEN,
          useValue: ACTIVITY_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(FindActivityByIdUseCase);
    repo = module.get(ACTIVITY_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'findById' function from the repository", async () => {
      const spy = jest.spyOn(repo, "findById");
      const activityId = 1;
      const challengeId = 2;

      await useCase.execute(activityId, challengeId);

      expect(spy).toHaveBeenCalledWith(activityId, challengeId);
    });
  });
});
