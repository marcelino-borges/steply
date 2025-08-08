import { Test, TestingModule } from "@nestjs/testing";
import { OrganizationController } from "./organization.controller";
import { CreateOrganizationUseCase } from "../../application/use-cases/create-organization.use-case";
import { UpdateOrganizationUseCase } from "../../application/use-cases/update-organization.use-case";
import { FindOrganizationByIdUseCase } from "../../application/use-cases/find-by-id.use-case";
import {
  EXISTING_ORG_NO_COUNTRY,
  EXISTING_ORG_WITH_COUNTRY,
  NON_EXISTING_ORG,
} from "../../__mocks__/organization.mock";
import { BadRequestException } from "@nestjs/common";
import { t } from "@/core/application/locales";

describe("OrganizationController", () => {
  let controller: OrganizationController;
  let createUseCase: CreateOrganizationUseCase;
  let updateUseCase: UpdateOrganizationUseCase;
  let findByIdUseCase: FindOrganizationByIdUseCase;

  const CreateUseCaseMock = {
    execute: jest.fn(),
  };

  class UpdateUseCaseMock {
    execute = jest.fn();
  }

  class FindByIdUseCaseMock {
    execute = jest.fn();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      providers: [
        {
          provide: CreateOrganizationUseCase,
          useValue: CreateUseCaseMock,
        },
        {
          provide: UpdateOrganizationUseCase,
          useClass: UpdateUseCaseMock,
        },
        {
          provide: FindOrganizationByIdUseCase,
          useClass: FindByIdUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get(OrganizationController);
    createUseCase = module.get(CreateOrganizationUseCase);
    findByIdUseCase = module.get(FindOrganizationByIdUseCase);
    updateUseCase = module.get(UpdateOrganizationUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findById", () => {
    const orgId = 1;

    it("should call the execute method from FindOrganizationByIdUseCase instance and return the organization found", async () => {
      jest
        .spyOn(findByIdUseCase, "execute")
        .mockResolvedValue(EXISTING_ORG_WITH_COUNTRY);
      const orgFound = await controller.findById({ organizationId: orgId });

      expect(findByIdUseCase.execute).toHaveBeenCalledWith(orgId);
      expect(orgFound).toStrictEqual(EXISTING_ORG_WITH_COUNTRY);
    });

    it("should throw a BadRequestException when no organization is found by the FindOrganizationByIdUseCase", async () => {
      jest.spyOn(findByIdUseCase, "execute").mockResolvedValue(null);
      const expectedErrorMsg = t("en").organization.notFound;

      try {
        await controller.findById({ organizationId: orgId });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(expectedErrorMsg);
      }
    });

    it("should throw a BadRequestException if the organizationId passed in params has not a valid type", async () => {
      try {
        await controller.findById({
          ...EXISTING_ORG_NO_COUNTRY,
          name: 123,
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "organizationId: Invalid field",
        );
      }
    });
  });

  describe("create", () => {
    it("should call the execute method from CreateOrganizationUseCase instance and return the organization created", async () => {
      jest
        .spyOn(createUseCase, "execute")
        .mockResolvedValue(EXISTING_ORG_WITH_COUNTRY);

      const result = await controller.create(NON_EXISTING_ORG);

      expect(createUseCase.execute).toHaveBeenCalledWith(NON_EXISTING_ORG);
      expect(result).toStrictEqual(EXISTING_ORG_WITH_COUNTRY);
    });

    it("should throw a BadRequestException if the body is not as expected for an org being created", async () => {
      try {
        await controller.create({
          ...EXISTING_ORG_NO_COUNTRY,
          name: 123,
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "name: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the body doesn't contain some of the required prop", async () => {
      try {
        await controller.create({
          countryId: 1,
          name: "Org1",
          street: "Lorem",
          city: "Ipsum",
          state: "Domet",
          addressNumber: "123B",
          neighborhood: "Lorem Ipsum",
          postalCode: "12340567",
          ownerId: 1,
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "cnpj: Required field",
        );
      }
    });
  });

  describe("update", () => {
    it("should call the execute method from UpdateOrganizationUseCase instance and return the organization updated", async () => {
      jest
        .spyOn(updateUseCase, "execute")
        .mockResolvedValue(EXISTING_ORG_WITH_COUNTRY);

      const result = await controller.update(EXISTING_ORG_NO_COUNTRY);

      expect(updateUseCase.execute).toHaveBeenCalledWith({
        ...EXISTING_ORG_NO_COUNTRY,
        createdAt: undefined,
        updatedAt: undefined,
      });
      expect(result).toStrictEqual(EXISTING_ORG_WITH_COUNTRY);
    });

    it("should throw a BadRequestException if the body is not as expected for an org being updated", async () => {
      try {
        await controller.update({
          ...EXISTING_ORG_NO_COUNTRY,
          name: 123,
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "name: Invalid field",
        );
      }
    });
  });
});
