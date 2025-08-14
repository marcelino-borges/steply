import { Test, TestingModule } from "@nestjs/testing";
import { FindAllInterestGeneralUseCase } from "@/modules/interests/application/use-cases/find-all-interest-general.use-case";
import { MOCK_INTEREST_GENERAL } from "@/modules/interests/__mocks__/interest-general.mock";
import { InterestGeneralController } from "./interest-general.controller";

describe("InterestGeneralController", () => {
  let controller: InterestGeneralController;
  let findAllInterestGeneralUseCase: FindAllInterestGeneralUseCase;

  const FindAllInterestGeneralUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestGeneralController],
      providers: [
        {
          provide: FindAllInterestGeneralUseCase,
          useValue: FindAllInterestGeneralUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get<InterestGeneralController>(InterestGeneralController);
    findAllInterestGeneralUseCase = module.get<FindAllInterestGeneralUseCase>(
      FindAllInterestGeneralUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findAll", () => {
    it("should call the execute method from FindAllInterestGeneralUseCase with lang parameter and return all general interests", async () => {
      jest
        .spyOn(findAllInterestGeneralUseCase, "execute")
        .mockResolvedValue(MOCK_INTEREST_GENERAL);

      const result = await controller.findAll("en");

      expect(findAllInterestGeneralUseCase.execute).toHaveBeenCalledTimes(1);
      expect(findAllInterestGeneralUseCase.execute).toHaveBeenCalledWith("en");
      expect(result).toEqual(MOCK_INTEREST_GENERAL);
    });

    it("should use default lang 'en' when no lang header is provided", async () => {
      jest
        .spyOn(findAllInterestGeneralUseCase, "execute")
        .mockResolvedValue(MOCK_INTEREST_GENERAL);

      const result = await controller.findAll();

      expect(findAllInterestGeneralUseCase.execute).toHaveBeenCalledTimes(1);
      expect(findAllInterestGeneralUseCase.execute).toHaveBeenCalledWith("en");
      expect(result).toEqual(MOCK_INTEREST_GENERAL);
    });
  });
});