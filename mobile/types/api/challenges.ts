import { ActivityDto } from "./activity";
import { MinimalOrganizationDto } from "./organization";
import { RankTypeDto } from "./rank-type";
import { RewardDto } from "./reward";

export enum JoinMethod {
  OPEN = "OPEN",
  INVITE = "INVITE",
  APPROVAL = "APPROVAL",
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
  organizationId: number;
  bannerUrl: string | null;
  interactionIncrement: number;
  tags: string[];
}

export interface FullChallengeDto extends ChallengeDto {
  organization: MinimalOrganizationDto | null;
  reward: RewardDto | null;
  rankTypes: RankTypeDto[];
  activities: ActivityDto[];
}

export interface NonExistingChallengeDto {
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  isPublic: boolean;
  joinMethod: JoinMethod;
  organizationId: number;
  bannerUrl?: string;
  rewardId?: number;
  interactionIncrement: number;
}
