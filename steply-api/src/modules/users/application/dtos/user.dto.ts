import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

import { DatabaseRecord } from "@/core/domain/abstractions/database-record.interface";
import { userIdParamsSchema } from "@/core/application/schemas/user.schema";
import { dbIdSchema } from "@/core/application/schemas/db-exclusive-fields.schema";
import { User } from "@/core/domain/entities/user.entity";
import { ExpandableCountry } from "@/core/domain/abstractions/expandable-country.interface";
import { CountryDto } from "@/core/application/dtos/country.dto";
import { ExpandableMinimalOrganization } from "@/core/domain/abstractions/expandable-organization.interface";
import { MinimalOrganizationDto } from "@/modules/organizations/application/dtos/organization.dto";
import { UserBadgeDto } from "@/modules/users/application/dtos/badge.dto";
import { UserChallengeResponseDto } from "@/modules/users/application/dtos/user-challenge.dto";
import { GeneralInterestDto } from "@/modules/users/application/dtos/general-interest.dto";
import { ActivityInterestDto } from "@/modules/users/application/dtos/activity-interest.dto";

export class NonExistentUserDto {
  @ApiProperty()
  countryId: number;
  @ApiProperty({ required: false })
  organizationId: number | null;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty({ required: false })
  street: string | null;
  @ApiProperty({ required: false })
  city: string | null;
  @ApiProperty({ required: false })
  state: string | null;
  @ApiProperty({ required: false })
  addressNumber: string | null;
  @ApiProperty({ required: false })
  neighborhood: string | null;
  @ApiProperty({ required: false })
  postalCode: string | null;
  @ApiProperty({ required: false })
  pictureUrl?: string | null;
  @ApiProperty({ required: false })
  bio?: string | null;
  @ApiProperty()
  acceptsCommunication: boolean;
  @ApiProperty({ required: false })
  wantsAccountPersonalization?: boolean;
  @ApiProperty({ required: false })
  genderId?: number | null;
  @ApiProperty({ required: false })
  goalId?: number | null;
  @ApiProperty({ required: false })
  mainGoalLevelId?: number | null;
  @ApiProperty({ required: false })
  nextRegistrationStep?: number;
}

export class UserIdParamsRequestDto {
  @ApiProperty()
  userId: number;
}

export class UserDto extends User implements DatabaseRecord {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class FullUserResponseDto
  extends UserDto
  implements DatabaseRecord, ExpandableCountry, ExpandableMinimalOrganization
{
  @ApiProperty()
  country?: CountryDto;
  @ApiProperty()
  organization?: MinimalOrganizationDto | null;
  @ApiProperty()
  ownedOrganization?: MinimalOrganizationDto | null;
  @ApiProperty()
  userChallenges?: UserChallengeResponseDto[];
  @ApiProperty()
  generalInterests?: GeneralInterestDto[];
  @ApiProperty()
  activityInterests?: ActivityInterestDto[];
  @ApiProperty()
  badges?: UserBadgeDto[];
}

export type UpdateUserRequestDto = Partial<NonExistentUserDto> &
  z.infer<ReturnType<typeof dbIdSchema>>;

export type UserIdParamsDto = z.infer<ReturnType<typeof userIdParamsSchema>>;
