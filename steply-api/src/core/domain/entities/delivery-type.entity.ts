import { ApiProperty } from "@nestjs/swagger";

export class DeliveryType {
  @ApiProperty()
  public readonly title: string;
  @ApiProperty()
  public readonly description: string | null;
  @ApiProperty()
  public readonly lang: string;
}
