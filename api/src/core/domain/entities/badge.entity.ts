import { ApiProperty } from "@nestjs/swagger";

export class Badge {
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public lang: string;
}
