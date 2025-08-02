import { ApiProperty } from "@nestjs/swagger";

export class UserChallenge {
  @ApiProperty()
  public readonly interactionCount: number;
  @ApiProperty()
  public readonly userId: number;
  @ApiProperty()
  public readonly challengeId: number;
}
