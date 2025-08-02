import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from "../../infra/repositories/user.repository";
import { NON_EXISTING_USER, USER_REPO_MOCK } from "../../__mocks__/user.mock";
import { UpdateUserUseCase } from "./update-user.use-case";

describe("UpdateUserUseCase", () => {
  let repository: UserRepository;
  let useCase: UpdateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        UpdateUserUseCase,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: USER_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(UpdateUserUseCase);
    repository = module.get(USER_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'update' function from UserRepository", async () => {
      const spy = jest.spyOn(repository, "update");
      const userUpdate = {
        ...NON_EXISTING_USER,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await useCase.execute(userUpdate.id, userUpdate);

      expect(spy).toHaveBeenCalledWith(userUpdate.id, userUpdate);
    });
  });
});
