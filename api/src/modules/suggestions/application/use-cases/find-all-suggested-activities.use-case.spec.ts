import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import { RankTypesSuggestionsRepository } from "@/modules/suggestions/infra/repositories/suggested-rank-types.repository";
import { ACTIVITIES_SUGGESTIONS_REPOSITORY_TOKEN } from "@/modules/suggestions/infra/repositories/suggested-activities.repository";
import { SUGGESTED_ACTITIVIES_REPO_MOCK } from "@/modules/suggestions/__mocks__/suggested-activities.mock";
import { FindAllSuggestedActivitiesUseCase } from "./find-all-suggested-activities.use-case";

describe("CreateChallengeUseCase", () => {
  let repo: RankTypesSuggestionsRepository;
  let useCase: FindAllSuggestedActivitiesUseCase;
  const lang = "en";

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        FindAllSuggestedActivitiesUseCase,
        {
          provide: ACTIVITIES_SUGGESTIONS_REPOSITORY_TOKEN,
          useValue: SUGGESTED_ACTITIVIES_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(FindAllSuggestedActivitiesUseCase);
    repo = module.get(ACTIVITIES_SUGGESTIONS_REPOSITORY_TOKEN);
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
