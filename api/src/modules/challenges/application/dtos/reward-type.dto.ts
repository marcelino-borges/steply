import { ApiProperty } from "@nestjs/swagger";

import { DatabaseRecord } from "@/core/domain/abstractions/database-record.interface";
import { RewardTypeBase } from "@/core/domain/entities/reward-type.entity";
import { DatabaseId } from "@/core/domain/abstractions/database-id.interface";

export class RewardTypeDto extends RewardTypeBase implements DatabaseRecord {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class UpdateRewardTypeDto extends RewardTypeBase implements DatabaseId {
  @ApiProperty()
  id: number;
}
