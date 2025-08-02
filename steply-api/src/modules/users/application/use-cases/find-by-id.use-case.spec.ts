import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from "@/modules/users/infra/repositories/user.repository";
import { USER_REPO_MOCK } from "@/modules/users/__mocks__/user.mock";
import { FindUserByIdUseCase } from "./find-by-id.use-case";

describe("FindUserByIdUseCase", () => {
  let repository: UserRepository;
  let useCase: FindUserByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        FindUserByIdUseCase,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: USER_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(FindUserByIdUseCase);
    repository = module.get(USER_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'findById' function from UserRepository", async () => {
      const spy = jest.spyOn(repository, "findById");
      const userId = 1;

      await useCase.execute(userId);

      expect(spy).toHaveBeenCalledWith(userId);
    });
  });
});
