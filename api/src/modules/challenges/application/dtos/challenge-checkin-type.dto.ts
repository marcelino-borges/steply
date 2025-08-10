import { ApiProperty } from "@nestjs/swagger";
import { DatabaseRecord } from "@/core/domain/abstractions/database-record.interface";
import { ChallengeCheckInTypeCode } from "@/core/domain/entities/challenge-checkin-type";

export class ChallengeCheckInTypeDto implements DatabaseRecord {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  lang: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  code: ChallengeCheckInTypeCode;
}
