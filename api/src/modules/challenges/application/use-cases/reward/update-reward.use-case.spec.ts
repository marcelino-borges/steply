import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  REWARD_REPOSITORY_TOKEN,
  RewardRepository,
} from "@/modules/challenges/infra/repositories/reward.repository";
import {
  EXISTING_REWARD,
  REWARD_REPO_MOCK,
} from "@/modules/challenges/__mocks__/reward.mock";
import { UpdateRewardUseCase } from "./update-reward.use-case";

describe("UpdateRewardUseCase", () => {
  let repo: RewardRepository;
  let useCase: UpdateRewardUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        UpdateRewardUseCase,
        {
          provide: REWARD_REPOSITORY_TOKEN,
          useValue: REWARD_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(UpdateRewardUseCase);
    repo = module.get(REWARD_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'update' function from the repository", async () => {
      const spy = jest.spyOn(repo, "update");

      await useCase.execute(EXISTING_REWARD);

      expect(spy).toHaveBeenCalledWith(EXISTING_REWARD);
    });
  });
});
