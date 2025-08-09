import { Test, TestingModule } from "@nestjs/testing";
import { FindAllChallengeCheckInTypesUseCase } from "@/modules/challenges/application/use-cases/challenge-checkin-type/find-all-challenge-checkin-types.use-case";
import { CHALLENGE_CHECKIN_TYPE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/challenge-checkin-type.repository";
import {
  MOCK_CHALLENGE_CHECKIN_TYPES,
  CHALLENGE_CHECKIN_TYPE_REPOSITORY_MOCK,
} from "@/modules/challenges/__mocks__/challenge-checkin-type.mock";

describe("FindAllChallengeCheckInTypesUseCase", () => {
  let useCase: FindAllChallengeCheckInTypesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllChallengeCheckInTypesUseCase,
        {
          provide: CHALLENGE_CHECKIN_TYPE_REPOSITORY_TOKEN,
          useValue: CHALLENGE_CHECKIN_TYPE_REPOSITORY_MOCK,
        },
      ],
    }).compile();

    useCase = module.get<FindAllChallengeCheckInTypesUseCase>(
      FindAllChallengeCheckInTypesUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("execute", () => {
    it("should return all challenge check-in types from the repository", async () => {
      CHALLENGE_CHECKIN_TYPE_REPOSITORY_MOCK.findAll.mockResolvedValue(
        MOCK_CHALLENGE_CHECKIN_TYPES,
      );

      const result = await useCase.execute();

      expect(result).toEqual(MOCK_CHALLENGE_CHECKIN_TYPES);
      expect(CHALLENGE_CHECKIN_TYPE_REPOSITORY_MOCK.findAll).toHaveBeenCalledTimes(1);
      expect(CHALLENGE_CHECKIN_TYPE_REPOSITORY_MOCK.findAll).toHaveBeenCalledWith();
    });

    it("should return an empty array when repository returns no check-in types", async () => {
      CHALLENGE_CHECKIN_TYPE_REPOSITORY_MOCK.findAll.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result).toEqual([]);
      expect(CHALLENGE_CHECKIN_TYPE_REPOSITORY_MOCK.findAll).toHaveBeenCalledTimes(1);
    });

    it("should propagate repository errors", async () => {
      const error = new Error("Database connection failed");
      CHALLENGE_CHECKIN_TYPE_REPOSITORY_MOCK.findAll.mockRejectedValue(error);

      await expect(useCase.execute()).rejects.toThrow("Database connection failed");
      expect(CHALLENGE_CHECKIN_TYPE_REPOSITORY_MOCK.findAll).toHaveBeenCalledTimes(1);
    });
  });
});