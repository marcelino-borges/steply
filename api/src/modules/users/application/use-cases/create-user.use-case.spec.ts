import { CreateUserUseCase } from "./create-user.use-case";
import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from "../../infra/repositories/user.repository";
import { NON_EXISTING_USER, USER_REPO_MOCK } from "../../__mocks__/user.mock";

describe("CreateUserUseCase", () => {
  let userRepository: UserRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        CreateUserUseCase,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: USER_REPO_MOCK,
        },
      ],
    }).compile();

    createUserUseCase = module.get(CreateUserUseCase);
    userRepository = module.get(USER_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof createUserUseCase.execute).toBe("function");
    });

    it("should call the 'create' function from UserRepository", async () => {
      const createSpy = jest.spyOn(userRepository, "create");

      await createUserUseCase.execute(NON_EXISTING_USER);

      expect(createSpy).toHaveBeenCalledWith(NON_EXISTING_USER);
    });
  });
});
