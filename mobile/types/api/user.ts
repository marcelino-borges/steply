import { CountryDto } from "./country";
import { MinimalOrganizationDto } from "./organization";

export enum UserRegistrationStep {
  PERSONAL_DATA = 0,
  INFORM_WANTS_PERSONALIZATION = 1,
  GENDER = 2,
  MAIN_GOAL = 3,
  MAIN_GOAL_CURRENT_LEVEL = 4,
  INTEREST_ACTIVITIES = 5,
  FINGERPRINT_ACCESS = 6,
  NONE = 7,
}

export interface UserBadgeDto {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneralInterestDto {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityInterestDto {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserChallengeResponseDto {
  id: number;
  userId: number;
  challengeId: number;
  joinedAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDto {
  id: number;
  countryId: number;
  organizationId: number | null;
  name: string;
  email: string;
  phone: string;
  street: string | null;
  city: string | null;
  state: string | null;
  addressNumber: string | null;
  neighborhood: string | null;
  postalCode: string | null;
  pictureUrl?: string | null;
  bio?: string | null;
  acceptsCommunication: boolean;
  wantsAccountPersonalization: boolean;
  genderId?: number | null;
  goalId?: number | null;
  mainGoalLevelId?: number | null;
  nextRegistrationStep?: UserRegistrationStep | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FullUserResponseDto extends UserDto {
  country?: CountryDto;
  organization?: MinimalOrganizationDto | null;
  ownedOrganization?: MinimalOrganizationDto | null;
  userChallenges?: UserChallengeResponseDto[];
  generalInterests?: GeneralInterestDto[];
  activityInterests?: ActivityInterestDto[];
  badges?: UserBadgeDto[];
}

export interface SignUpRequestDto {
  countryId: number;
  organizationId?: number | null;
  name: string;
  email: string;
  phone: string;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  addressNumber?: string | null;
  neighborhood?: string | null;
  postalCode?: string | null;
  pictureUrl?: string | null;
  bio?: string | null;
  acceptsCommunication: boolean;
  wantsAccountPersonalization?: boolean;
  genderId?: number | null;
  goalId?: number | null;
  mainGoalLevelId?: number | null;
  nextRegistrationStep?: number;
}

export interface UpdateUserRequestDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  street?: string;
  city?: string;
  state?: string;
  bio?: string | null;
  neighborhood?: string;
  addressNumber?: string;
  postalCode?: string;
  pictureUrl?: string | null;
  organizationId?: number | null;
  countryId: number;
  acceptsCommunication: boolean;
  wantsAccountPersonalization?: boolean;
  genderId?: number | null;
  goalId?: number | null;
  mainGoalLevelId?: number | null;
  nextRegistrationStep?: UserRegistrationStep;
}
