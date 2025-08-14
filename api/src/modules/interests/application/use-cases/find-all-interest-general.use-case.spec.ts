import { Test, TestingModule } from "@nestjs/testing";
import { InterestGeneralRepositoryInterface } from "@/modules/interests/infra/abstractions/interest-general-repository.interface";
import { INTEREST_GENERAL_REPOSITORY_TOKEN } from "@/modules/interests/infra/repositories/interest-general.repository";
import {
  INTEREST_GENERAL_REPOSITORY_MOCK,
  MOCK_INTEREST_GENERAL,
} from "@/modules/interests/__mocks__/interest-general.mock";
import { FindAllInterestGeneralUseCase } from "./find-all-interest-general.use-case";

describe("FindAllInterestGeneralUseCase", () => {
  let useCase: FindAllInterestGeneralUseCase;
  let interestGeneralRepository: InterestGeneralRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllInterestGeneralUseCase,
        {
          provide: INTEREST_GENERAL_REPOSITORY_TOKEN,
          useValue: INTEREST_GENERAL_REPOSITORY_MOCK,
        },
      ],
    }).compile();

    useCase = module.get<FindAllInterestGeneralUseCase>(FindAllInterestGeneralUseCase);
    interestGeneralRepository = module.get<InterestGeneralRepositoryInterface>(
      INTEREST_GENERAL_REPOSITORY_TOKEN,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("execute", () => {
    it("should call interest general repository findAll method with lang", async () => {
      jest.spyOn(interestGeneralRepository, "findAll").mockResolvedValue(MOCK_INTEREST_GENERAL);

      await useCase.execute("en");

      expect(interestGeneralRepository.findAll).toHaveBeenCalledTimes(1);
      expect(interestGeneralRepository.findAll).toHaveBeenCalledWith("en");
    });

    it("should return all general interests from repository", async () => {
      jest.spyOn(interestGeneralRepository, "findAll").mockResolvedValue(MOCK_INTEREST_GENERAL);

      const result = await useCase.execute("en");

      expect(result).toEqual(MOCK_INTEREST_GENERAL);
    });
  });
});