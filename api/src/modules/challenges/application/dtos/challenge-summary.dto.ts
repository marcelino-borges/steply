import { ApiProperty } from "@nestjs/swagger";

export class ChallengeSummaryDto {
  @ApiProperty({
    description: "Number of participants in the challenge",
    example: 42,
  })
  participantCount: number;

  @ApiProperty({
    description: "Total number of check-ins created today for this challenge",
    example: 15,
  })
  checkInsToday: number;

  @ApiProperty({
    description: "Total number of check-ins globally for this challenge",
    example: 523,
  })
  checkInsTotal: number;

  @ApiProperty({
    description: "Number of check-ins that contain media (video or image)",
    example: 287,
  })
  mediaCount: number;
}