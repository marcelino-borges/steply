import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  ACTIVITY_REPOSITORY_TOKEN,
  ActivityRepository,
} from "@/modules/challenges/infra/repositories/activity.repository";
import { ACTIVITY_REPO_MOCK } from "@/modules/challenges/__mocks__/activity.mock";
import { ActivityQueryParamsDto } from "@/modules/challenges/application/dtos/activity-query.dto";
import { QueryActivitiesUseCase } from "./query-activities.use-case";

describe("FindActivityByIdUseCase", () => {
  let repo: ActivityRepository;
  let useCase: QueryActivitiesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        QueryActivitiesUseCase,
        {
          provide: ACTIVITY_REPOSITORY_TOKEN,
          useValue: ACTIVITY_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(QueryActivitiesUseCase);
    repo = module.get(ACTIVITY_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'query' function from the repository", async () => {
      const spy = jest.spyOn(repo, "query");

      const params: ActivityQueryParamsDto = {
        endAt: new Date(),
        startAt: new Date(),
        pageNumber: 1,
        pageSize: 12,
        searchActivity: "searchActivity",
        searchChallenge: "searchChallenge",
      };
      const challengeId = 1;

      await useCase.execute(challengeId, params);

      expect(spy).toHaveBeenCalledWith(challengeId, params);
    });
  });
});
