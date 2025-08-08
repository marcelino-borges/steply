import { Test, TestingModule } from "@nestjs/testing";

import {
  ORGANIZATION_REPOSITORY_TOKEN,
  OrganizationRepository,
} from "@/modules/organizations/infra/repository/organization.repository";
import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  EXISTING_ORG_WITH_COUNTRY,
  ORGANIZATION_REPO_MOCK,
} from "@/modules/organizations/__mocks__/organization.mock";
import { UpdateOrganizationUseCase } from "./update-organization.use-case";

describe("UpdateOrganizationUseCase", () => {
  let orgRepository: OrganizationRepository;
  let updateOrgCase: UpdateOrganizationUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        UpdateOrganizationUseCase,
        {
          provide: ORGANIZATION_REPOSITORY_TOKEN,
          useValue: ORGANIZATION_REPO_MOCK,
        },
      ],
    }).compile();

    updateOrgCase = module.get(UpdateOrganizationUseCase);
    orgRepository = module.get(ORGANIZATION_REPOSITORY_TOKEN);
  });

  describe("execute", () => {
    it("should have the method 'execute' extended from the base UseCase class", () => {
      expect(typeof updateOrgCase.execute).toBe("function");
    });

    it("should call the 'update' function from OrganizationRepository", async () => {
      const updateSpy = jest.spyOn(orgRepository, "update");

      await updateOrgCase.execute(EXISTING_ORG_WITH_COUNTRY);

      expect(updateSpy).toHaveBeenCalledWith(EXISTING_ORG_WITH_COUNTRY);
    });
  });
});
