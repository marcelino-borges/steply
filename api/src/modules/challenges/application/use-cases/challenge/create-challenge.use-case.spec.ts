import { Test, TestingModule } from "@nestjs/testing";
import { CHALLENGE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/constants/challenge.constants";
import { ChallengeRepository } from "@/modules/challenges/infra/repositories/challenge.repository";
import { CreateChallengeUseCase } from "./create-challenge.use-case";
import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  CHALLENGES_REPO_MOCK,
  NON_EXISTING_CHALLENGE_MOCK,
} from "@/modules/challenges/__mocks__/challenge.mock";

describe("CreateChallengeUseCase", () => {
  let repo: ChallengeRepository;
  let useCase: CreateChallengeUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        CreateChallengeUseCase,
        {
          provide: CHALLENGE_REPOSITORY_TOKEN,
          useValue: CHALLENGES_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(CreateChallengeUseCase);
    repo = module.get(CHALLENGE_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'create' function from ChallengeRepository", async () => {
      const createSpy = jest.spyOn(repo, "create");

      await useCase.execute(NON_EXISTING_CHALLENGE_MOCK);

      expect(createSpy).toHaveBeenCalledWith(NON_EXISTING_CHALLENGE_MOCK);
    });
  });
});
