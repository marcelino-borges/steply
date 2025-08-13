import { DatabaseDates } from "@/core/domain/abstractions/database-dates.interface";
import { JoinMethod } from "@/core/domain/entities/challenge.entity";
import { UserChallenge } from "@/core/domain/entities/user-challenge.entity";
import { ApiProperty } from "@nestjs/swagger";

export class JoinChallengeDto {
  @ApiProperty()
  userId: number;
}

export class UserChallengeResponseDto implements DatabaseDates {
  @ApiProperty()
  challengeId: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  startAt: Date;
  @ApiProperty()
  endAt: Date;
  @ApiProperty()
  bannerUrl: string | null;
  @ApiProperty()
  isPublic: boolean;
  @ApiProperty()
  joinMethod: JoinMethod;
  @ApiProperty({ required: false })
  organizationId: number | null;
  @ApiProperty({ required: false })
  ownerUserId: number | null;
  @ApiProperty()
  checkInsCount: number;
  @ApiProperty()
  checkIns: {
    date: Date;
  }[];
  @ApiProperty({ type: [String] })
  tags: string[];
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class UserChallengeDto extends UserChallenge implements DatabaseDates {
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
