import { Test, TestingModule } from "@nestjs/testing";

import {
  CHALLENGE_REPOSITORY_TOKEN,
  ChallengeRepository,
} from "@/modules/challenges/infra/repositories/challenge.repository";
import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  CHALLENGES_REPO_MOCK,
  EXISTING_CHALLENGE_INTERACTION,
  NON_EXISTING_CHALLENGE_INTERACTION,
} from "@/modules/challenges/__mocks__/challenge.mock";
import { UserInteractChallengeUseCase } from "./user-interact-challenge.use-case";

describe("UserInteractChallengeUseCase", () => {
  let repo: ChallengeRepository;
  let useCase: UserInteractChallengeUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        UserInteractChallengeUseCase,
        {
          provide: CHALLENGE_REPOSITORY_TOKEN,
          useValue: CHALLENGES_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(UserInteractChallengeUseCase);
    repo = module.get(CHALLENGE_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'createUserInteraction' function from ChallengeRepository", async () => {
      const spy = jest.spyOn(repo, "createUserInteraction");

      await useCase.execute({
        ...NON_EXISTING_CHALLENGE_INTERACTION,
        challengeId: EXISTING_CHALLENGE_INTERACTION.id,
      });

      expect(spy).toHaveBeenCalledWith({
        ...NON_EXISTING_CHALLENGE_INTERACTION,
        challengeId: EXISTING_CHALLENGE_INTERACTION.id,
      });
    });
  });
});
