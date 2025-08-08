import { ApiProperty } from "@nestjs/swagger";

export class Reward {
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public description: string | null;
  @ApiProperty()
  public rewardTypeId: number;
  @ApiProperty()
  public deliveryDetails: string | null;
  @ApiProperty()
  public challengeId: number;
}
