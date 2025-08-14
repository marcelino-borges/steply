import { ApiProperty } from "@nestjs/swagger";

import { ActivityInterest } from "@/core/domain/entities/activity-interest.entity";
import { DatabaseRecord } from "@/core/domain/abstractions/database-record.interface";

export class ActivityInterestDto
  extends ActivityInterest
  implements DatabaseRecord
{
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
