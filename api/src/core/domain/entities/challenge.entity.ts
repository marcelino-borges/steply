import { ApiProperty } from "@nestjs/swagger";

export class Challenge {
  @ApiProperty()
  public readonly title: string;
  @ApiProperty()
  public readonly description: string;
  @ApiProperty()
  public readonly startAt: Date;
  @ApiProperty()
  public readonly endAt: Date;
  @ApiProperty()
  public readonly isPublic: boolean;
  @ApiProperty()
  public readonly joinMethod: JoinMethod;
  @ApiProperty()
  public readonly organizationId: number;
  @ApiProperty()
  public readonly bannerUrl: string | null;
  @ApiProperty()
  public readonly interactionIncrement: number;
  @ApiProperty({ type: [String] })
  public readonly tags: string[];
  @ApiProperty()
  public readonly checkInEndOfDay: boolean;
  @ApiProperty()
  public readonly multipleCheckIns: boolean;
  @ApiProperty()
  public readonly checkInTypeCode: number;
}

export enum JoinMethod {
  OPEN = "OPEN",
  INVITE = "INVITE",
  APPROVAL = "APPROVAL",
}
