import { ApiProperty } from "@nestjs/swagger";

import { DatabaseId } from "@/core/domain/abstractions/database-id.interface";
import { DatabaseRecord } from "@/core/domain/abstractions/database-record.interface";
import { Activity } from "@/core/domain/entities/activity.entity";

export class NonExistingActivityDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  startAt: Date;
  @ApiProperty()
  endAt: Date;
  @ApiProperty()
  description?: string;
}

export class ActivityDto extends Activity implements DatabaseRecord {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class UpdateActivityDto extends Activity implements DatabaseId {
  @ApiProperty()
  id: number;
}

export class ActivityByIdParamsDto {
  @ApiProperty()
  activityId: number;
  @ApiProperty()
  challengeId: number;
}
