import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import { ChallengeRepository } from "@/modules/challenges/infra/repositories/challenge.repository";
import {
  REWARD_REPOSITORY_TOKEN,
  RewardRepository,
} from "@/modules/challenges/infra/repositories/reward.repository";
import {
  NON_EXISTING_REWARD,
  REWARD_REPO_MOCK,
} from "@/modules/challenges/__mocks__/reward.mock";
import { CreateActivityUseCase } from "./create-activity.use-case";
import {
  ACTIVITY_REPOSITORY_TOKEN,
  ActivityRepository,
} from "@/modules/challenges/infra/repositories/activity.repository";
import {
  EXISTING_ACTIVITY,
  NON_EXISTING_ACTIVITY,
} from "@/modules/challenges/__mocks__/activity.mock";

describe("CreateActivityUseCase", () => {
  let repo: ActivityRepository;
  let useCase: CreateActivityUseCase;
  const challengeId = EXISTING_ACTIVITY.challengeId;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        CreateActivityUseCase,
        {
          provide: ACTIVITY_REPOSITORY_TOKEN,
          useValue: REWARD_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(CreateActivityUseCase);
    repo = module.get(ACTIVITY_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'create' function from the repository", async () => {
      const createSpy = jest.spyOn(repo, "create");

      await useCase.execute(NON_EXISTING_ACTIVITY, challengeId);

      expect(createSpy).toHaveBeenCalledWith(
        NON_EXISTING_ACTIVITY,
        challengeId,
      );
    });
  });
});
