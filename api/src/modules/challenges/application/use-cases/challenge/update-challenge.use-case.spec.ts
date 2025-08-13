import { Test, TestingModule } from "@nestjs/testing";
import { CHALLENGE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/constants/challenge.constants";
import { ChallengeRepository } from "@/modules/challenges/infra/repositories/challenge.repository";
import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  CHALLENGES_REPO_MOCK,
  EXISTING_CHALLENGE_MOCK,
} from "@/modules/challenges/__mocks__/challenge.mock";
import { UpdateChallengeUseCase } from "./update-challenge.use-case";

describe("UpdateChallengeUseCase", () => {
  let repo: ChallengeRepository;
  let useCase: UpdateChallengeUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        UpdateChallengeUseCase,
        {
          provide: CHALLENGE_REPOSITORY_TOKEN,
          useValue: CHALLENGES_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(UpdateChallengeUseCase);
    repo = module.get(CHALLENGE_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'update' function from ChallengeRepository", async () => {
      const updateSpy = jest.spyOn(repo, "update");

      await useCase.execute(EXISTING_CHALLENGE_MOCK);

      expect(updateSpy).toHaveBeenCalledWith(EXISTING_CHALLENGE_MOCK);
    });
  });
});
