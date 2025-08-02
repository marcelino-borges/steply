import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  REWARD_REPOSITORY_TOKEN,
  RewardRepository,
} from "@/modules/challenges/infra/repositories/reward.repository";
import { REWARD_REPO_MOCK } from "@/modules/challenges/__mocks__/reward.mock";
import { FindAllRewardsUseCase } from "./find-all-rewards.use-case";

describe("FindRewardByIdUseCase", () => {
  let repo: RewardRepository;
  let useCase: FindAllRewardsUseCase;
  const challengeId = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        FindAllRewardsUseCase,
        {
          provide: REWARD_REPOSITORY_TOKEN,
          useValue: REWARD_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(FindAllRewardsUseCase);
    repo = module.get(REWARD_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'findAll' function from the repository", async () => {
      const spy = jest.spyOn(repo, "findAll");

      await useCase.execute(challengeId);

      expect(spy).toHaveBeenCalledWith(challengeId);
    });
  });
});
