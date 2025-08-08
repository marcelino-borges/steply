import { CountryDto } from "./country";

export interface NonExistingOrganizationDto {
  countryId: number;
  organizationId?: number | null;
  name: string;
  cnpj: string;
  street: string;
  city: string;
  state: string;
  addressNumber: string;
  neighborhood: string;
  postalCode: string;
  ownerId: number;
}

export interface OrganizationDto extends NonExistingOrganizationDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  country?: CountryDto;
}

export interface MinimalOrganizationDto
  extends Pick<OrganizationDto, "id" | "name"> {
  id: number;
  name: string;
}
