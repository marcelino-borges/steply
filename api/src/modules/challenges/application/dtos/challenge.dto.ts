import { ApiProperty } from "@nestjs/swagger";

import { DatabaseRecord } from "@/core/domain/abstractions/database-record.interface";
import { Challenge, JoinMethod } from "@/core/domain/entities/challenge.entity";
import { MinimalOrganizationDto } from "@/modules/organizations/application/dtos/organization.dto";
import { RewardDto } from "@/modules/challenges/application/dtos/reward.dto";
import { RankTypeDto } from "@/modules/challenges/application/dtos/rank-type.dto";
import { ActivityDto } from "@/modules/challenges/application/dtos/activity.dto";
import { UserChallengeInteraction } from "@/core/domain/entities/user-challenge-interaction.entity";
import { DatabaseId } from "@/core/domain/abstractions/database-id.interface";

export class NonExistingChallengeDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  startAt: Date;
  @ApiProperty()
  endAt: Date;
  @ApiProperty()
  isPublic: boolean;
  @ApiProperty()
  joinMethod: JoinMethod;
  @ApiProperty()
  organizationId: number;
  @ApiProperty()
  bannerUrl?: string;
  @ApiProperty()
  rewardId?: number;
  @ApiProperty()
  interactionIncrement: number;
  @ApiProperty({ type: [String] })
  tags: string[];
}

interface ChallengeExpandableFieldsDto {
  organization: MinimalOrganizationDto | null;
  reward: RewardDto | null;
  rankTypes: RankTypeDto[];
  activities: ActivityDto[];
}

export class ChallengeDto extends Challenge implements DatabaseRecord {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class UpdateChallengeDto extends Challenge implements DatabaseId {
  @ApiProperty()
  id: number;
}

export class FullChallengeDto
  extends ChallengeDto
  implements ChallengeExpandableFieldsDto
{
  @ApiProperty()
  organization: MinimalOrganizationDto | null;
  @ApiProperty()
  reward: RewardDto | null;
  @ApiProperty()
  rankTypes: RankTypeDto[];
  @ApiProperty()
  activities: ActivityDto[];
}

export class ChallengeIdParamsDto {
  @ApiProperty()
  challengeId: number;
}

export class UserInteractChallengeBodyDto {
  @ApiProperty()
  public readonly videoUrl?: string;
  @ApiProperty()
  public readonly imageUrl?: string;
  @ApiProperty()
  public readonly text?: string;
  @ApiProperty()
  public readonly location?: string;
  @ApiProperty()
  public readonly userId: number;
}

export class UserInteractChallengeDto extends UserInteractChallengeBodyDto {
  @ApiProperty()
  public readonly challengeId: number;
}

export class UserChallengeInteractionDto
  extends UserChallengeInteraction
  implements DatabaseRecord
{
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  id: number;
  @ApiProperty()
  challenge?: ChallengeDto;
}
