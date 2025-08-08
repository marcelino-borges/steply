import { Test, TestingModule } from "@nestjs/testing";
import {
  ORGANIZATION_REPOSITORY_TOKEN,
  OrganizationRepository,
} from "@/modules/organizations/infra/repository/organization.repository";
import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  NON_EXISTING_ORG,
  ORGANIZATION_REPO_MOCK,
} from "@/modules/organizations/__mocks__/organization.mock";
import { CreateOrganizationUseCase } from "./create-organization.use-case";

describe("CreateOrganizationUseCase", () => {
  let orgRepository: OrganizationRepository;
  let createOrgCase: CreateOrganizationUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        CreateOrganizationUseCase,
        {
          provide: ORGANIZATION_REPOSITORY_TOKEN,
          useValue: ORGANIZATION_REPO_MOCK,
        },
      ],
    }).compile();

    createOrgCase = module.get(CreateOrganizationUseCase);
    orgRepository = module.get(ORGANIZATION_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof createOrgCase.execute).toBe("function");
    });

    it("should call the 'create' function from OrganizationRepository", async () => {
      const createSpy = jest.spyOn(orgRepository, "create");

      await createOrgCase.execute(NON_EXISTING_ORG);

      expect(createSpy).toHaveBeenCalledWith(NON_EXISTING_ORG);
    });
  });
});
