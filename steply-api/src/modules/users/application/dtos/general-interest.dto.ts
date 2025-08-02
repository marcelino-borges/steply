import { ApiProperty } from "@nestjs/swagger";

import { DatabaseDates } from "@/core/domain/abstractions/database-dates.interface";
import { GeneralInterest } from "@/core/domain/entities/general-interest.entity";

export class GeneralInterestDto
  extends GeneralInterest
  implements DatabaseDates
{
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
