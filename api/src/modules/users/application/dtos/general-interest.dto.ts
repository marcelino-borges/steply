import { ApiProperty } from "@nestjs/swagger";

import { GeneralInterest } from "@/core/domain/entities/general-interest.entity";
import { DatabaseRecord } from "@/core/domain/abstractions/database-record.interface";

export class GeneralInterestDto
  extends GeneralInterest
  implements DatabaseRecord
{
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
