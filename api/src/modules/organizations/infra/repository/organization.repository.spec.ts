import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { OrganizationRepository } from "./organization.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import {
  EXISTING_ORG_WITH_COUNTRY,
  NON_EXISTING_ORG,
} from "@/modules/organizations/__mocks__/organization.mock";

describe("Organization", () => {
  let prismaService: PrismaService;
  let orgRepository: OrganizationRepository;

  const orgId = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    prismaService = module.get(PrismaService);
    orgRepository = module.get(OrganizationRepository);
  });

  describe("create", () => {
    it("should call the database function to create an organization", async () => {
      const createSpy = jest.spyOn(prismaService.organization, "create");

      await orgRepository.create(NON_EXISTING_ORG);

      expect(createSpy).toHaveBeenCalledWith({
        data: NON_EXISTING_ORG,
        include: { country: true },
      });
    });

    it("should return the organization created on database", async () => {
      jest
        .spyOn(prismaService.organization, "create")
        .mockResolvedValue(EXISTING_ORG_WITH_COUNTRY);

      const result = await orgRepository.create(NON_EXISTING_ORG);

      expect(result).toStrictEqual(EXISTING_ORG_WITH_COUNTRY);
    });
  });

  describe("update", () => {
    it("should call the database function to update an organization", async () => {
      const updateSpy = jest.spyOn(prismaService.organization, "update");

      await orgRepository.update(EXISTING_ORG_WITH_COUNTRY);

      expect(updateSpy).toHaveBeenCalledWith({
        where: { id: EXISTING_ORG_WITH_COUNTRY.id },
        data: EXISTING_ORG_WITH_COUNTRY,
        include: { country: true },
      });
    });

    it("should return the organization updated on database", async () => {
      const updatedOrg = {
        ...EXISTING_ORG_WITH_COUNTRY,
        name: "Org Updated",
      };
      jest
        .spyOn(prismaService.organization, "update")
        .mockResolvedValue(updatedOrg);

      const result = await orgRepository.update(updatedOrg);

      expect(result).toStrictEqual(updatedOrg);
    });
  });

  describe("findById", () => {
    it("should call the database function to find the organization by id", async () => {
      const findByIdSpy = jest.spyOn(prismaService.organization, "findUnique");

      await orgRepository.findById(orgId);

      expect(findByIdSpy).toHaveBeenCalledWith({
        where: { id: orgId },
        include: { country: true },
      });
    });

    it("should return the organization found on database, if it exists", async () => {
      jest
        .spyOn(prismaService.organization, "findUnique")
        .mockResolvedValue(EXISTING_ORG_WITH_COUNTRY);

      const result = await orgRepository.findById(orgId);

      expect(result).toStrictEqual(EXISTING_ORG_WITH_COUNTRY);
    });

    it("should return null if the organization doesn't exist on database", async () => {
      jest
        .spyOn(prismaService.organization, "findUnique")
        .mockResolvedValue(null);

      const result = await orgRepository.findById(orgId);

      expect(result).toBeNull();
    });
  });
});
