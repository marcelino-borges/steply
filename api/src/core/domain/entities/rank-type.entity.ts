import { ApiProperty } from "@nestjs/swagger";

export class RankType {
  @ApiProperty()
  public readonly title: string;
  @ApiProperty()
  public readonly minCheckIns: number;
  @ApiProperty()
  public readonly rank: number;
  @ApiProperty()
  public readonly challengeId: number;
  @ApiProperty()
  public readonly description: string | null;
}
