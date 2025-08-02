import {
  ORGANIZATION_REPOSITORY_TOKEN,
  OrganizationRepository,
} from "@/modules/organizations/infra/repository/organization.repository";
import { FindOrganizationByIdUseCase } from "./find-by-id.use-case";
import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseModule } from "@/core/infra/services/database.module";
import { ORGANIZATION_REPO_MOCK } from "../../__mocks__/organization.mock";

describe("FindOrganizationByIdUseCase", () => {
  let orgRepository: OrganizationRepository;
  let findByIdUseCase: FindOrganizationByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        FindOrganizationByIdUseCase,
        {
          provide: ORGANIZATION_REPOSITORY_TOKEN,
          useValue: ORGANIZATION_REPO_MOCK,
        },
      ],
    }).compile();

    findByIdUseCase = module.get(FindOrganizationByIdUseCase);
    orgRepository = module.get(ORGANIZATION_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof findByIdUseCase.execute).toBe("function");
    });

    it("should call the 'findById' function from OrganizationRepository", async () => {
      const findByIdSpy = jest.spyOn(orgRepository, "findById");
      const orgId = 1;

      await findByIdUseCase.execute(orgId);

      expect(findByIdSpy).toHaveBeenCalledWith(orgId);
    });
  });
});
