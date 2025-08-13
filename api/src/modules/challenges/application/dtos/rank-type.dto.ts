import { ApiProperty } from "@nestjs/swagger";

import { DatabaseRecord } from "@/core/domain/abstractions/database-record.interface";
import { RankType } from "@/core/domain/entities/rank-type.entity";
import { DatabaseId } from "@/core/domain/abstractions/database-id.interface";

export class NonExistingRankTypeDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  minCheckIns: number;
  @ApiProperty()
  rank: number;
  @ApiProperty()
  description?: string;
}

export class RankTypeIdParam {
  @ApiProperty()
  rankTypeId: number;
  @ApiProperty()
  challengeId: number;
}

export class RankTypeDto extends RankType implements DatabaseRecord {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class UpdateRankTypeDto
  extends NonExistingRankTypeDto
  implements DatabaseId
{
  @ApiProperty()
  id: number;
}
