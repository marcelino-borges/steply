import { Test, TestingModule } from "@nestjs/testing";

import { FindAllSuggestedActivitiesUseCase } from "@/modules/suggestions/application/use-cases/find-all-suggested-activities.use-case";
import { FindAllSuggestedRankTypesUseCase } from "@/modules/suggestions/application/use-cases/find-all-suggested-rank-types.use-case";
import { EXISTING_SUGGESTED_ACTIVITY_MOCK } from "@/modules/suggestions/__mocks__/suggested-activities.mock";
import { EXISTING_SUGGESTED_RANK_TYPE_MOCK } from "@/modules/suggestions/__mocks__/suggested-rank-types.mock";
import { SuggestionsController } from "./suggestions.controller";

describe("CountryController", () => {
  let controller: SuggestionsController;

  let findAllActivitiesUseCase: FindAllSuggestedActivitiesUseCase;
  let findAllRankTypesUseCase: FindAllSuggestedRankTypesUseCase;

  const FindAllSuggestedActivitiesUseCaseMock = {
    execute: jest.fn(),
  };

  const FindAllSuggestedRankTypesUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestionsController],
      providers: [
        {
          provide: FindAllSuggestedActivitiesUseCase,
          useValue: FindAllSuggestedActivitiesUseCaseMock,
        },
        {
          provide: FindAllSuggestedRankTypesUseCase,
          useValue: FindAllSuggestedRankTypesUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get(SuggestionsController);

    findAllActivitiesUseCase = module.get(FindAllSuggestedActivitiesUseCase);
    findAllRankTypesUseCase = module.get(FindAllSuggestedRankTypesUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findAllSuggestedActivities", () => {
    it("should call the execute method from FindAllSuggestedActivitiesUseCase instance with the landguage passed in the headers and return the results", async () => {
      const lang = "pt";

      jest
        .spyOn(findAllActivitiesUseCase, "execute")
        .mockResolvedValue([EXISTING_SUGGESTED_ACTIVITY_MOCK]);

      const results = await controller.findAllSuggestedActivities(lang);

      expect(findAllActivitiesUseCase.execute).toHaveBeenCalledWith(lang);
      expect(results).toStrictEqual([EXISTING_SUGGESTED_ACTIVITY_MOCK]);
    });

    it("should call the execute method from FindAllSuggestedActivitiesUseCase instance with 'en' as landguage when no lang header is passed and return the results", async () => {
      jest
        .spyOn(findAllActivitiesUseCase, "execute")
        .mockResolvedValue([EXISTING_SUGGESTED_ACTIVITY_MOCK]);

      const results = await controller.findAllSuggestedActivities();

      expect(findAllActivitiesUseCase.execute).toHaveBeenCalledWith("en");
      expect(results).toStrictEqual([EXISTING_SUGGESTED_ACTIVITY_MOCK]);
    });
  });

  describe("findAllSuggestedRankTypes", () => {
    it("should call the execute method from FindAllSuggestedRankTypesUseCase instance with the landguage passed in the headers and return the results", async () => {
      const lang = "pt";

      jest
        .spyOn(findAllRankTypesUseCase, "execute")
        .mockResolvedValue([EXISTING_SUGGESTED_RANK_TYPE_MOCK]);
      const results = await controller.findAllSuggestedRankTypes(lang);

      expect(findAllRankTypesUseCase.execute).toHaveBeenCalledWith(lang);
      expect(results).toStrictEqual([EXISTING_SUGGESTED_RANK_TYPE_MOCK]);
    });

    it("should call the execute method from FindAllSuggestedRankTypesUseCase instance with 'en' as landguage when no lang header is passed and return the results", async () => {
      jest
        .spyOn(findAllRankTypesUseCase, "execute")
        .mockResolvedValue([EXISTING_SUGGESTED_RANK_TYPE_MOCK]);

      const results = await controller.findAllSuggestedRankTypes();

      expect(findAllRankTypesUseCase.execute).toHaveBeenCalledWith("en");
      expect(results).toStrictEqual([EXISTING_SUGGESTED_RANK_TYPE_MOCK]);
    });
  });
});
