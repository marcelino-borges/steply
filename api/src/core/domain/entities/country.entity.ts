import { ApiProperty } from "@nestjs/swagger";

export class Country {
  @ApiProperty()
  public readonly name: string;
  @ApiProperty()
  public readonly abbreviation: string;
  @ApiProperty()
  public readonly phoneCode: number;
}
