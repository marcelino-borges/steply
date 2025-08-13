import { Test, TestingModule } from "@nestjs/testing";

import { GetChallengeSummaryUseCase } from "@/modules/challenges/application/use-cases/challenge/get-challenge-summary.use-case";
import { CHALLENGE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/constants/challenge.constants";
import { BaseChallengeRepository } from "@/modules/challenges/infra/abstractions/challenge-repository.interface";
import {
  CHALLENGE_SUMMARY_MOCK,
  EMPTY_CHALLENGE_SUMMARY_MOCK,
} from "@/modules/challenges/__mocks__/challenge-summary.mock";

describe("GetChallengeSummaryUseCase", () => {
  let useCase: GetChallengeSummaryUseCase;
  let repository: BaseChallengeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetChallengeSummaryUseCase,
        {
          provide: CHALLENGE_REPOSITORY_TOKEN,
          useValue: {
            getChallengeSummary: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetChallengeSummaryUseCase>(
      GetChallengeSummaryUseCase,
    );
    repository = module.get<BaseChallengeRepository>(
      CHALLENGE_REPOSITORY_TOKEN,
    );
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    it("should return challenge summary when challenge exists", async () => {
      const challengeId = 1;
      jest
        .spyOn(repository, "getChallengeSummary")
        .mockResolvedValue(CHALLENGE_SUMMARY_MOCK);

      const result = await useCase.execute(challengeId);

      expect(result).toEqual(CHALLENGE_SUMMARY_MOCK);
      expect(repository.getChallengeSummary).toHaveBeenCalledWith(challengeId);
    });

    it("should return null when challenge does not exist", async () => {
      const challengeId = 999;
      jest.spyOn(repository, "getChallengeSummary").mockResolvedValue(null);

      const result = await useCase.execute(challengeId);

      expect(result).toBeNull();
      expect(repository.getChallengeSummary).toHaveBeenCalledWith(challengeId);
    });

    it("should return empty summary for challenge with no activity", async () => {
      const challengeId = 2;
      jest
        .spyOn(repository, "getChallengeSummary")
        .mockResolvedValue(EMPTY_CHALLENGE_SUMMARY_MOCK);

      const result = await useCase.execute(challengeId);

      expect(result).toEqual(EMPTY_CHALLENGE_SUMMARY_MOCK);
      expect(result?.participantCount).toBe(0);
      expect(result?.checkInsToday).toBe(0);
      expect(result?.checkInsTotal).toBe(0);
      expect(result?.mediaCount).toBe(0);
    });
  });
});