import { ApiProperty } from "@nestjs/swagger";

import { DatabaseRecord } from "@/core/domain/abstractions/database-record.interface";
import { Reward } from "@/core/domain/entities/reward.entity";
import { RewardTypeDto } from "./reward-type.dto";
import { DatabaseId } from "@/core/domain/abstractions/database-id.interface";

export class NonExistingRewardDto {
  @ApiProperty()
  rewardTypeId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  deliveryDetails?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  imageUrl?: string;
  @ApiProperty()
  filesUrls?: string[];
}

export class RewardDto extends Reward implements DatabaseRecord {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class UpdateRewardDto extends Reward implements DatabaseId {
  @ApiProperty()
  id: number;
}

export class RewardWithTypeDto extends RewardDto {
  @ApiProperty()
  rewardType: RewardTypeDto | null;
}

export class RewardByIdParamsDto {
  @ApiProperty()
  rewardId: number;
  @ApiProperty()
  challengeId: number;
}
