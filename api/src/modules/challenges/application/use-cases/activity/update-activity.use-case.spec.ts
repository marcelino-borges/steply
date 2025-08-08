import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  ACTIVITY_REPOSITORY_TOKEN,
  ActivityRepository,
} from "@/modules/challenges/infra/repositories/activity.repository";
import {
  ACTIVITY_REPO_MOCK,
  EXISTING_ACTIVITY,
} from "@/modules/challenges/__mocks__/activity.mock";
import { UpdateActivityUseCase } from "./update-activity.use-case";

describe("UpdateActivityUseCase", () => {
  let repo: ActivityRepository;
  let useCase: UpdateActivityUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        UpdateActivityUseCase,
        {
          provide: ACTIVITY_REPOSITORY_TOKEN,
          useValue: ACTIVITY_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(UpdateActivityUseCase);
    repo = module.get(ACTIVITY_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'update' function from the repository", async () => {
      const spy = jest.spyOn(repo, "update");

      await useCase.execute(EXISTING_ACTIVITY);

      expect(spy).toHaveBeenCalledWith(EXISTING_ACTIVITY);
    });
  });
});
