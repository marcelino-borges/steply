import { ApiProperty } from "@nestjs/swagger";

export class UserBadge {
  @ApiProperty()
  public name: string;
}
