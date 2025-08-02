import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import { RewardRepository } from "@/modules/challenges/infra/repositories/reward.repository";
import { ACTIVITY_REPO_MOCK } from "@/modules/challenges/__mocks__/activity.mock";
import { ACTIVITY_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/activity.repository";
import { DeleteActivityUseCase } from "./delete-activity.use-case";

describe("DeleteActivityUseCase", () => {
  let repo: RewardRepository;
  let useCase: DeleteActivityUseCase;
  const activityId = 1;
  const challengeId = 2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        DeleteActivityUseCase,
        {
          provide: ACTIVITY_REPOSITORY_TOKEN,
          useValue: ACTIVITY_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(DeleteActivityUseCase);
    repo = module.get(ACTIVITY_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'delete' function from the repository", async () => {
      const spy = jest.spyOn(repo, "delete");

      await useCase.execute(activityId, challengeId);

      expect(spy).toHaveBeenCalledWith(activityId, challengeId);
    });
  });
});
