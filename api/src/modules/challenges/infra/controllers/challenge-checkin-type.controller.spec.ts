import { Test, TestingModule } from "@nestjs/testing";
import { ChallengeCheckInTypeController } from "@/modules/challenges/infra/controllers/challenge-checkin-type.controller";
import { FindAllChallengeCheckInTypesUseCase } from "@/modules/challenges/application/use-cases/challenge-checkin-type/find-all-challenge-checkin-types.use-case";
import { MOCK_CHALLENGE_CHECKIN_TYPES } from "@/modules/challenges/__mocks__/challenge-checkin-type.mock";

describe("ChallengeCheckInTypeController", () => {
  let controller: ChallengeCheckInTypeController;
  let findAllUseCase: FindAllChallengeCheckInTypesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeCheckInTypeController],
      providers: [
        {
          provide: FindAllChallengeCheckInTypesUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ChallengeCheckInTypeController>(
      ChallengeCheckInTypeController,
    );
    findAllUseCase = module.get<FindAllChallengeCheckInTypesUseCase>(
      FindAllChallengeCheckInTypesUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return all challenge check-in types from the use case", async () => {
      jest
        .spyOn(findAllUseCase, "execute")
        .mockResolvedValue(MOCK_CHALLENGE_CHECKIN_TYPES);

      const result = await controller.findAll();

      expect(result).toEqual(MOCK_CHALLENGE_CHECKIN_TYPES);
      expect(findAllUseCase.execute).toHaveBeenCalledTimes(1);
      expect(findAllUseCase.execute).toHaveBeenCalledWith();
    });

    it("should return an empty array when use case returns no check-in types", async () => {
      jest.spyOn(findAllUseCase, "execute").mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(findAllUseCase.execute).toHaveBeenCalledTimes(1);
    });

    it("should propagate errors from the use case", async () => {
      const error = new Error("Service unavailable");
      jest.spyOn(findAllUseCase, "execute").mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow("Service unavailable");
      expect(findAllUseCase.execute).toHaveBeenCalledTimes(1);
    });

    it("should handle multiple calls correctly", async () => {
      jest
        .spyOn(findAllUseCase, "execute")
        .mockResolvedValue(MOCK_CHALLENGE_CHECKIN_TYPES);

      const result1 = await controller.findAll();
      const result2 = await controller.findAll();
      const result3 = await controller.findAll();

      expect(result1).toEqual(MOCK_CHALLENGE_CHECKIN_TYPES);
      expect(result2).toEqual(MOCK_CHALLENGE_CHECKIN_TYPES);
      expect(result3).toEqual(MOCK_CHALLENGE_CHECKIN_TYPES);
      expect(findAllUseCase.execute).toHaveBeenCalledTimes(3);
    });
  });
});