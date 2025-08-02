import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  RANK_TYPE_SUGGESTIONS_REPOSITORY_TOKEN,
  RankTypesSuggestionsRepository,
} from "@/modules/suggestions/infra/repositories/suggested-rank-types.repository";
import { SUGGESTED_RANK_TYPES_REPO_MOCK } from "@/modules/suggestions/__mocks__/suggested-rank-types.mock";
import { FindAllSuggestedRankTypesUseCase } from "./find-all-suggested-rank-types.use-case";

describe("CreateChallengeUseCase", () => {
  let repo: RankTypesSuggestionsRepository;
  let useCase: FindAllSuggestedRankTypesUseCase;
  const lang = "en";

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        FindAllSuggestedRankTypesUseCase,
        {
          provide: RANK_TYPE_SUGGESTIONS_REPOSITORY_TOKEN,
          useValue: SUGGESTED_RANK_TYPES_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(FindAllSuggestedRankTypesUseCase);
    repo = module.get(RANK_TYPE_SUGGESTIONS_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'findAll' function from the repository", async () => {
      const spy = jest.spyOn(repo, "findAll");

      await useCase.execute(lang);

      expect(spy).toHaveBeenCalled();
    });
  });
});
