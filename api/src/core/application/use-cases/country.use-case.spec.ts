import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  COUNTRY_REPOSITORY_TOKEN,
  CountryRepository,
} from "@/core/infra/repositories/country.repository";
import { COUNTRY_REPO_MOCK } from "@/core/__mocks__/country.mock";
import { FindAllCountriesUseCase } from "./country.use-case";

describe("FindAllCountriesUseCase", () => {
  let repo: CountryRepository;
  let useCase: FindAllCountriesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        FindAllCountriesUseCase,
        {
          provide: COUNTRY_REPOSITORY_TOKEN,
          useValue: COUNTRY_REPO_MOCK,
        },
      ],
    }).compile();

    useCase = module.get(FindAllCountriesUseCase);
    repo = module.get(COUNTRY_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof useCase.execute).toBe("function");
    });

    it("should call the 'findAll' function from the repository", async () => {
      const spy = jest.spyOn(repo, "findAll");

      await useCase.execute();

      expect(spy).toHaveBeenCalled();
    });
  });
});
