import {
  NonExistingOrganizationDto,
  OrganizationDto,
} from "@/modules/organizations/application/dtos/organization.dto";

export const ORGANIZATION_REPO_MOCK = {
  create: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
};

export const NON_EXISTING_ORG: NonExistingOrganizationDto = {
  countryId: 1,
  name: "Org1",
  cnpj: "012345678901234",
  street: "Lorem",
  city: "Ipsum",
  state: "Domet",
  addressNumber: "123B",
  neighborhood: "Lorem Ipsum",
  postalCode: "12340567",
  ownerId: 1,
};

export const EXISTING_ORG_NO_COUNTRY: OrganizationDto = {
  ...NON_EXISTING_ORG,
  id: 1,
  updatedAt: new Date(),
  createdAt: new Date(),
};

export const EXISTING_ORG_WITH_COUNTRY: OrganizationDto = {
  ...EXISTING_ORG_NO_COUNTRY,
  country: {
    id: 1,
    abbreviation: "BR",
    name: "Brazil",
    phoneCode: 55,
  },
};
