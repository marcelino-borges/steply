import { ApiProperty } from "@nestjs/swagger";

export abstract class RewardTypeBase {
  @ApiProperty()
  public readonly title: string;
  @ApiProperty()
  public readonly description: string | null;
  @ApiProperty()
  public readonly recommended: boolean;
  @ApiProperty()
  public readonly lang: string;
}
