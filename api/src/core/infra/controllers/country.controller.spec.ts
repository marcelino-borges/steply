import { Test, TestingModule } from "@nestjs/testing";

import { BadRequestException } from "@nestjs/common";
import { t } from "@/core/application/locales";
import { CountryController } from "./country.controller";
import { FindAllCountriesUseCase } from "@/core/application/use-cases/country.use-case";
import { EXISTING_COUNTRY_MOCK } from "@/core/__mocks__/country.mock";

describe("CountryController", () => {
  let controller: CountryController;

  let findAllUseCase: FindAllCountriesUseCase;

  const FindAllCountriesUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [
        {
          provide: FindAllCountriesUseCase,
          useValue: FindAllCountriesUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get(CountryController);

    findAllUseCase = module.get(FindAllCountriesUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findAll", () => {
    it("should call the execute method from FindAllRewardsUseCase instance", async () => {
      jest
        .spyOn(findAllUseCase, "execute")
        .mockResolvedValue([EXISTING_COUNTRY_MOCK]);
      await controller.findAll();

      expect(findAllUseCase.execute).toHaveBeenCalledWith();
    });
  });
});
