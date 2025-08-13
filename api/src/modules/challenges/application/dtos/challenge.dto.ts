import { ApiProperty } from "@nestjs/swagger";

import { DatabaseRecord } from "@/core/domain/abstractions/database-record.interface";
import { Challenge, JoinMethod } from "@/core/domain/entities/challenge.entity";
import { MinimalOrganizationDto } from "@/modules/organizations/application/dtos/organization.dto";
import {
  RewardDto,
  NonExistingRewardDto,
} from "@/modules/challenges/application/dtos/reward.dto";
import { RankTypeDto } from "@/modules/challenges/application/dtos/rank-type.dto";
import {
  ActivityDto,
  NonExistingActivityDto,
} from "@/modules/challenges/application/dtos/activity.dto";
import { UserChallengeCheckIn } from "@/core/domain/entities/user-challenge-checkin.entity";
import { DatabaseId } from "@/core/domain/abstractions/database-id.interface";
import { ChallengeCheckInTypeDto } from "@/modules/challenges/application/dtos/challenge-checkin-type.dto";
import { ChallengeCheckInTypeCode } from "@/core/domain/entities/challenge-checkin-type";

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
  @ApiProperty({ required: false })
  organizationId?: number | null;
  @ApiProperty({ required: false })
  ownerUserId?: number | null;
  @ApiProperty()
  bannerUrl?: string;
  @ApiProperty()
  reward?: Omit<NonExistingRewardDto, "challengeId">;
  @ApiProperty()
  interactionIncrement: number;
  @ApiProperty({ type: [String] })
  tags: string[];
  @ApiProperty()
  checkInEndOfDay: boolean;
  @ApiProperty()
  multipleCheckIns: boolean;
  @ApiProperty()
  checkInTypeCode: ChallengeCheckInTypeCode;
  @ApiProperty({ type: [NonExistingActivityDto], required: false })
  activities?: NonExistingActivityDto[];
}

export class MinimalUserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty({ required: false })
  pictureUrl?: string | null;
}

interface ChallengeExpandableFieldsDto {
  organization: MinimalOrganizationDto | null;
  ownerUser: MinimalUserDto | null;
  reward: RewardDto | null;
  rankTypes: RankTypeDto[];
  activities: ActivityDto[];
  checkInType: ChallengeCheckInTypeDto | null;
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
  ownerUser: MinimalUserDto | null;
  @ApiProperty()
  reward: RewardDto | null;
  @ApiProperty()
  rankTypes: RankTypeDto[];
  @ApiProperty()
  activities: ActivityDto[];
  @ApiProperty()
  checkInType: ChallengeCheckInTypeDto | null;
}

export class ChallengeIdParamsDto {
  @ApiProperty()
  challengeId: number;
}

export class UserCheckInChallengeBodyDto {
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

export class UserCheckInChallengeDto extends UserCheckInChallengeBodyDto {
  @ApiProperty()
  public readonly challengeId: number;
}

export class UserChallengeCheckInDto
  extends UserChallengeCheckIn
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
