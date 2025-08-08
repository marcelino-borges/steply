import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from "@/modules/users/infra/repositories/user.repository";
import { USER_REPO_MOCK } from "@/modules/users/__mocks__/user.mock";
import { FindUserByEmailUseCase } from "./find-by-email.use-case";

describe("FindUserByEmailUseCase", () => {
  let repository: UserRepository;
  let useCase: FindUserByEmailUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        FindUserByEmailUseCase,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: USER_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(FindUserByEmailUseCase);
    repository = module.get(USER_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'findByEmail' function from UserRepository", async () => {
      const spy = jest.spyOn(repository, "findByEmail");
      const userEmail = "test@example.com";

      await useCase.execute(userEmail);

      expect(spy).toHaveBeenCalledWith(userEmail);
    });
  });
});