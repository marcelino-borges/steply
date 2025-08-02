import { JoinChallengeUseCase } from "./join-challenge.use-case";
import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import { USER_REPO_MOCK } from "@/modules/users/__mocks__/user.mock";
import {
  USER_CHALLENGE_REPOSITORY_TOKEN,
  UserChallengeRepository,
} from "@/modules/users/infra/repositories/user-challenge.repository";

describe("JoinChallengeUseCase ", () => {
  let userChallengeRepository: UserChallengeRepository;
  let joinChallengeUseCase: JoinChallengeUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        JoinChallengeUseCase,
        {
          provide: USER_CHALLENGE_REPOSITORY_TOKEN,
          useValue: USER_REPO_MOCK,
        },
      ],
    }).compile();

    joinChallengeUseCase = module.get(JoinChallengeUseCase);
    userChallengeRepository = module.get(USER_CHALLENGE_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof joinChallengeUseCase.execute).toBe("function");
    });

    it("should call the 'create' function from UserChallengesRepository", async () => {
      const joinChallengeSpy = jest.spyOn(userChallengeRepository, "create");
      const userId = 1;
      const challengeId = 2;

      await joinChallengeUseCase.execute(
        {
          userId,
        },
        challengeId,
      );

      expect(joinChallengeSpy).toHaveBeenCalledWith(
        {
          userId,
        },
        challengeId,
      );
    });
  });
});
