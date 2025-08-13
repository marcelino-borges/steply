import { Test, TestingModule } from "@nestjs/testing";
import { CHALLENGE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/constants/challenge.constants";
import { ChallengeRepository } from "@/modules/challenges/infra/repositories/challenge.repository";
import { DatabaseModule } from "@/core/infra/services/database.module";
import { CHALLENGES_REPO_MOCK } from "@/modules/challenges/__mocks__/challenge.mock";
import { QueryChallengesUseCase } from "./query-challenges.use-case";
import { ChallengeQueryParamsDto } from "../../dtos/challenge-query.dto";

describe("QueryChallengesUseCase", () => {
  let repo: ChallengeRepository;
  let useCase: QueryChallengesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        QueryChallengesUseCase,
        {
          provide: CHALLENGE_REPOSITORY_TOKEN,
          useValue: CHALLENGES_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(QueryChallengesUseCase);
    repo = module.get(CHALLENGE_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'query' function from ChallengeRepository", async () => {
      const querySpy = jest.spyOn(repo, "query");
      const params: ChallengeQueryParamsDto = {
        org: 1,
        search: "text",
        pageNumber: 2,
        pageSize: 20,
      };

      await useCase.execute(params);

      expect(querySpy).toHaveBeenCalledWith(params);
    });
  });
});
