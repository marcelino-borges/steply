import { ActivityDto } from "./activity";
import { MinimalOrganizationDto } from "./organization";
import { RankTypeDto } from "./rank-type";
import { RewardDto, NonExistingRewardDto } from "./reward";

export interface MinimalUserDto {
  id: number;
  name: string;
  email: string;
  pictureUrl?: string | null;
}

export enum JoinMethod {
  OPEN = "OPEN",
  INVITE = "INVITE",
  APPROVAL = "APPROVAL",
}

export enum ChallengeCheckInTypeCode {
  DAILY_DIFFERENT_ACTIVITIES,
  REPEATING_ACTIVITIES,
}

export interface ChallengeCheckInTypeDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  lang: string;
  name: string;
  description: string;
  code: ChallengeCheckInTypeCode;
}

export interface ChallengeDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  isPublic: boolean;
  joinMethod: JoinMethod;
  organizationId: number | null;
  ownerUserId: number | null;
  bannerUrl: string | null;
  interactionIncrement: number;
  tags: string[];
  checkInEndOfDay: boolean;
  multipleCheckIns: boolean;
  checkInTypeCode: ChallengeCheckInTypeCode;
}

export interface FullChallengeDto extends ChallengeDto {
  organization: MinimalOrganizationDto | null;
  ownerUser: MinimalUserDto | null;
  reward: RewardDto | null;
  rankTypes: RankTypeDto[];
  activities: ActivityDto[];
  checkInType: ChallengeCheckInTypeDto | null;
}

export interface NonExistingChallengeDto {
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  isPublic: boolean;
  joinMethod: JoinMethod;
  organizationId?: number | null;
  ownerUserId?: number | null;
  bannerUrl?: string;
  reward?: NonExistingRewardDto;
  interactionIncrement: number;
  tags: string[];
  checkInEndOfDay: boolean;
  multipleCheckIns: boolean;
  checkInTypeCode: number;
}
