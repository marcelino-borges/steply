import { Test, TestingModule } from "@nestjs/testing";
import { GenderRepositoryInterface } from "@/modules/genders/infra/abstractions/gender-repository.interface";
import { GENDER_REPOSITORY_TOKEN } from "@/modules/genders/infra/repositories/gender.repository";
import {
  GENDER_REPOSITORY_MOCK,
  MOCK_GENDERS,
} from "@/modules/genders/__mocks__/gender.mock";
import { FindAllGendersUseCase } from "./find-all-genders.use-case";

describe("FindAllGendersUseCase", () => {
  let useCase: FindAllGendersUseCase;
  let genderRepository: GenderRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllGendersUseCase,
        {
          provide: GENDER_REPOSITORY_TOKEN,
          useValue: GENDER_REPOSITORY_MOCK,
        },
      ],
    }).compile();

    useCase = module.get<FindAllGendersUseCase>(FindAllGendersUseCase);
    genderRepository = module.get<GenderRepositoryInterface>(
      GENDER_REPOSITORY_TOKEN,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("execute", () => {
    it("should call gender repository findAll method", async () => {
      jest.spyOn(genderRepository, "findAll").mockResolvedValue(MOCK_GENDERS);

      await useCase.execute();

      expect(genderRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should return all genders from repository", async () => {
      jest.spyOn(genderRepository, "findAll").mockResolvedValue(MOCK_GENDERS);

      const result = await useCase.execute();

      expect(result).toEqual(MOCK_GENDERS);
    });
  });
});
