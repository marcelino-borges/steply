import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  USER_CHALLENGE_REPOSITORY_TOKEN,
  UserChallengeRepository,
} from "@/modules/users/infra/repositories/user-challenge.repository";
import { USER_CHALLENGES_REPO_MOCK } from "@/modules/users/__mocks__/user-challenges.mock";
import { FindAllUserChallengesUseCase } from "./find-all-challenges.use-case";

describe("FindUserByIdUseCase", () => {
  let repository: UserChallengeRepository;
  let useCase: FindAllUserChallengesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        FindAllUserChallengesUseCase,
        {
          provide: USER_CHALLENGE_REPOSITORY_TOKEN,
          useValue: USER_CHALLENGES_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(FindAllUserChallengesUseCase);
    repository = module.get(USER_CHALLENGE_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'query' function from repository", async () => {
      const spy = jest.spyOn(repository, "query");
      const userId = 1;

      await useCase.execute(userId);

      expect(spy).toHaveBeenCalledWith(userId);
    });
  });
});
