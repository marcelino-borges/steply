import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

import { CountryDto } from "@/core/application/dtos/country.dto";
import { DatabaseRecord } from "@/core/domain/abstractions/database-record.interface";
import { findOrganizationByIdSchema } from "@/core/application/schemas/organization.schema";
import { ExpandableCountry } from "@/core/domain/abstractions/expandable-country.interface";
import { DatabaseId } from "@/core/domain/abstractions/database-id.interface";

export class NonExistingOrganizationDto {
  @ApiProperty()
  countryId: number;
  @ApiProperty()
  organizationId?: number | null;
  @ApiProperty()
  name: string;
  @ApiProperty()
  cnpj: string;
  @ApiProperty()
  street: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  addressNumber: string;
  @ApiProperty()
  neighborhood: string;
  @ApiProperty()
  postalCode: string;
  @ApiProperty()
  ownerId: number;
}

export class OrganizationDto
  extends NonExistingOrganizationDto
  implements DatabaseRecord, ExpandableCountry
{
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  country?: CountryDto;
}

export class UpdateOrganizationDto
  extends NonExistingOrganizationDto
  implements DatabaseId
{
  @ApiProperty()
  id: number;
}

export class MinimalOrganizationDto
  implements Pick<OrganizationDto, "id" | "name">
{
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

export class FindOrganizationByIdParamsDto
  implements z.infer<ReturnType<typeof findOrganizationByIdSchema>>
{
  @ApiProperty()
  organizationId: number;
}
