import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  REWARD_REPOSITORY_TOKEN,
  RewardRepository,
} from "@/modules/challenges/infra/repositories/reward.repository";
import {
  NON_EXISTING_REWARD,
  REWARD_REPO_MOCK,
} from "@/modules/challenges/__mocks__/reward.mock";
import { CreateRewardUseCase } from "./create-reward.use-case";

describe("CreateRewardUseCase", () => {
  let repo: RewardRepository;
  let useCase: CreateRewardUseCase;
  const challengeId = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        CreateRewardUseCase,
        {
          provide: REWARD_REPOSITORY_TOKEN,
          useValue: REWARD_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(CreateRewardUseCase);
    repo = module.get(REWARD_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'create' function from the repository", async () => {
      const createSpy = jest.spyOn(repo, "create");

      await useCase.execute(NON_EXISTING_REWARD, challengeId);

      expect(createSpy).toHaveBeenCalledWith(NON_EXISTING_REWARD, challengeId);
    });
  });
});
