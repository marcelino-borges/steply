import { Test, TestingModule } from "@nestjs/testing";

import { CHALLENGE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/constants/challenge.constants";
import { ChallengeRepository } from "@/modules/challenges/infra/repositories/challenge.repository";
import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  CHALLENGES_REPO_MOCK,
  EXISTING_CHALLENGE_CHECKIN,
  NON_EXISTING_CHALLENGE_CHECKIN,
} from "@/modules/challenges/__mocks__/challenge.mock";
import { UserCheckInChallengeUseCase } from "./user-interact-challenge.use-case";

describe("UserInteractChallengeUseCase", () => {
  let repo: ChallengeRepository;
  let useCase: UserCheckInChallengeUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        UserCheckInChallengeUseCase,
        {
          provide: CHALLENGE_REPOSITORY_TOKEN,
          useValue: CHALLENGES_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(UserCheckInChallengeUseCase);
    repo = module.get(CHALLENGE_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'createUserCheckIn' function from ChallengeRepository", async () => {
      const spy = jest.spyOn(repo, "createUserCheckIn");

      await useCase.execute({
        ...NON_EXISTING_CHALLENGE_CHECKIN,
        challengeId: EXISTING_CHALLENGE_CHECKIN.id,
      });

      expect(spy).toHaveBeenCalledWith({
        ...NON_EXISTING_CHALLENGE_CHECKIN,
        challengeId: EXISTING_CHALLENGE_CHECKIN.id,
      });
    });
  });
});
