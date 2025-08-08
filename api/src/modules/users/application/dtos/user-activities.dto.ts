import { ApiProperty } from "@nestjs/swagger";

export class UserActivitiesDto {
  @ApiProperty({ type: [Number], description: "Array of activity IDs" })
  activityIds: number[];
}

export class UserActivityParamsDto {
  @ApiProperty()
  userId: number;
}
