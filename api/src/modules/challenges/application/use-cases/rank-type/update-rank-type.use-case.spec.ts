import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  RANK_TYPE_REPOSITORY_TOKEN,
  RankTypeRepository,
} from "@/modules/challenges/infra/repositories/rank-type.repository";
import {
  EXISTING_RANK_TYPE_MOCK,
  RANK_TYPE_REPO_MOCK,
} from "@/modules/challenges/__mocks__/rank-type.mock";
import { UpdateRankTypeUseCase } from "./update-rank-type.use-case";

describe("CreateChallengeUseCase", () => {
  let repo: RankTypeRepository;
  let useCase: UpdateRankTypeUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        UpdateRankTypeUseCase,
        {
          provide: RANK_TYPE_REPOSITORY_TOKEN,
          useValue: RANK_TYPE_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(UpdateRankTypeUseCase);
    repo = module.get(RANK_TYPE_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'update' function from the repository", async () => {
      const spy = jest.spyOn(repo, "update");

      await useCase.execute(
        EXISTING_RANK_TYPE_MOCK,
        EXISTING_RANK_TYPE_MOCK.challengeId,
      );

      expect(spy).toHaveBeenCalledWith(
        EXISTING_RANK_TYPE_MOCK,
        EXISTING_RANK_TYPE_MOCK.challengeId,
      );
    });
  });
});
