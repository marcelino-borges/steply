import { ApiProperty } from "@nestjs/swagger";

export class UserChallengeInteraction {
  @ApiProperty()
  public readonly videoUrl: string | null;
  @ApiProperty()
  public readonly imageUrl: string | null;
  @ApiProperty()
  public readonly text: string | null;
  @ApiProperty()
  public readonly location: string | null;
  @ApiProperty()
  public readonly userId: number;
  @ApiProperty()
  public readonly challengeId: number;
}
