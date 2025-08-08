import { Test, TestingModule } from "@nestjs/testing";
import {
  CHALLENGE_REPOSITORY_TOKEN,
  ChallengeRepository,
} from "@/modules/challenges/infra/repositories/challenge.repository";
import { DatabaseModule } from "@/core/infra/services/database.module";
import { CHALLENGES_REPO_MOCK } from "@/modules/challenges/__mocks__/challenge.mock";
import { FindChallengeByIdUseCase } from "./find-challenge-by-id.use-case";

describe("FindChallengeByIdUseCase", () => {
  let repo: ChallengeRepository;
  let useCase: FindChallengeByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        FindChallengeByIdUseCase,
        {
          provide: CHALLENGE_REPOSITORY_TOKEN,
          useValue: CHALLENGES_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(FindChallengeByIdUseCase);
    repo = module.get(CHALLENGE_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'findById' function from ChallengeRepository", async () => {
      const findByIdSpy = jest.spyOn(repo, "findById");
      const id = 1;

      await useCase.execute(id);

      expect(findByIdSpy).toHaveBeenCalledWith(id);
    });
  });
});
