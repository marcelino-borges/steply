import { ApiProperty } from "@nestjs/swagger";

export class SuggestedRankType {
  @ApiProperty()
  public readonly title: string;
  @ApiProperty()
  public readonly description: string | null;
  @ApiProperty()
  public readonly startAt: Date;
  @ApiProperty()
  public readonly endAt: Date;
  @ApiProperty()
  public readonly challengeId: number;
}
