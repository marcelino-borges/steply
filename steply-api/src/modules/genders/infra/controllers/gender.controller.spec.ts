import { Test, TestingModule } from "@nestjs/testing";
import { FindAllGendersUseCase } from "@/modules/genders/application/use-cases/find-all-genders.use-case";
import { MOCK_GENDERS } from "@/modules/genders/__mocks__/gender.mock";
import { GenderController } from "./gender.controller";

describe("GenderController", () => {
  let controller: GenderController;
  let findAllGendersUseCase: FindAllGendersUseCase;

  const FindAllGendersUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenderController],
      providers: [
        {
          provide: FindAllGendersUseCase,
          useValue: FindAllGendersUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get<GenderController>(GenderController);
    findAllGendersUseCase = module.get<FindAllGendersUseCase>(
      FindAllGendersUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findAll", () => {
    it("should call the execute method from FindAllGendersUseCase and return all genders", async () => {
      jest
        .spyOn(findAllGendersUseCase, "execute")
        .mockResolvedValue(MOCK_GENDERS);

      const result = await controller.findAll();

      expect(findAllGendersUseCase.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MOCK_GENDERS);
    });
  });
});
