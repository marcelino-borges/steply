import { Test, TestingModule } from "@nestjs/testing";
import { FindAllInterestActivitiesUseCase } from "@/modules/interests/application/use-cases/find-all-interest-activities.use-case";
import { MOCK_INTEREST_ACTIVITIES } from "@/modules/interests/__mocks__/interest-activity.mock";
import { InterestActivityController } from "./interest-activity.controller";

describe("InterestActivityController", () => {
  let controller: InterestActivityController;
  let findAllInterestActivitiesUseCase: FindAllInterestActivitiesUseCase;

  const FindAllInterestActivitiesUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestActivityController],
      providers: [
        {
          provide: FindAllInterestActivitiesUseCase,
          useValue: FindAllInterestActivitiesUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get<InterestActivityController>(InterestActivityController);
    findAllInterestActivitiesUseCase = module.get<FindAllInterestActivitiesUseCase>(
      FindAllInterestActivitiesUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findAll", () => {
    it("should call the execute method from FindAllInterestActivitiesUseCase with lang parameter and return all interest activities", async () => {
      jest
        .spyOn(findAllInterestActivitiesUseCase, "execute")
        .mockResolvedValue(MOCK_INTEREST_ACTIVITIES);

      const result = await controller.findAll("en");

      expect(findAllInterestActivitiesUseCase.execute).toHaveBeenCalledTimes(1);
      expect(findAllInterestActivitiesUseCase.execute).toHaveBeenCalledWith("en");
      expect(result).toEqual(MOCK_INTEREST_ACTIVITIES);
    });

    it("should use default lang 'en' when no lang header is provided", async () => {
      jest
        .spyOn(findAllInterestActivitiesUseCase, "execute")
        .mockResolvedValue(MOCK_INTEREST_ACTIVITIES);

      const result = await controller.findAll();

      expect(findAllInterestActivitiesUseCase.execute).toHaveBeenCalledTimes(1);
      expect(findAllInterestActivitiesUseCase.execute).toHaveBeenCalledWith("en");
      expect(result).toEqual(MOCK_INTEREST_ACTIVITIES);
    });
  });
});