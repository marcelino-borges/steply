import { ApiProperty } from "@nestjs/swagger";

import { ActivityInterest } from "@/core/domain/entities/activity-interest.entity";
import { DatabaseDates } from "@/core/domain/abstractions/database-dates.interface";

export class ActivityInterestDto
  extends ActivityInterest
  implements DatabaseDates
{
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
