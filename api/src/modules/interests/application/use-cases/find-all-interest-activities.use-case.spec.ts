import { Test, TestingModule } from "@nestjs/testing";
import { InterestActivityRepositoryInterface } from "@/modules/interests/infra/abstractions/interest-activity-repository.interface";
import { INTEREST_ACTIVITY_REPOSITORY_TOKEN } from "@/modules/interests/infra/repositories/interest-activity.repository";
import {
  INTEREST_ACTIVITY_REPOSITORY_MOCK,
  MOCK_INTEREST_ACTIVITIES,
} from "@/modules/interests/__mocks__/interest-activity.mock";
import { FindAllInterestActivitiesUseCase } from "./find-all-interest-activities.use-case";

describe("FindAllInterestActivitiesUseCase", () => {
  let useCase: FindAllInterestActivitiesUseCase;
  let interestActivityRepository: InterestActivityRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllInterestActivitiesUseCase,
        {
          provide: INTEREST_ACTIVITY_REPOSITORY_TOKEN,
          useValue: INTEREST_ACTIVITY_REPOSITORY_MOCK,
        },
      ],
    }).compile();

    useCase = module.get<FindAllInterestActivitiesUseCase>(FindAllInterestActivitiesUseCase);
    interestActivityRepository = module.get<InterestActivityRepositoryInterface>(
      INTEREST_ACTIVITY_REPOSITORY_TOKEN,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("execute", () => {
    it("should call interest activity repository findAll method with lang", async () => {
      jest.spyOn(interestActivityRepository, "findAll").mockResolvedValue(MOCK_INTEREST_ACTIVITIES);

      await useCase.execute("en");

      expect(interestActivityRepository.findAll).toHaveBeenCalledTimes(1);
      expect(interestActivityRepository.findAll).toHaveBeenCalledWith("en");
    });

    it("should return all interest activities from repository", async () => {
      jest.spyOn(interestActivityRepository, "findAll").mockResolvedValue(MOCK_INTEREST_ACTIVITIES);

      const result = await useCase.execute("en");

      expect(result).toEqual(MOCK_INTEREST_ACTIVITIES);
    });
  });
});