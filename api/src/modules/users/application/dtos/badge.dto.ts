import { ApiProperty } from "@nestjs/swagger";

import { UserBadge } from "@/core/domain/entities/user-badge.entity";
import { DatabaseRecord } from "@/core/domain/abstractions/database-record.interface";

export class UserBadgeDto extends UserBadge implements DatabaseRecord {
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  id: number;
}
