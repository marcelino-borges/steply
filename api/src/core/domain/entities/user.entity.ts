import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty()
  public countryId: number;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public phone: string;
  @ApiProperty()
  public street: string | null;
  @ApiProperty()
  public city: string | null;
  @ApiProperty()
  public state: string | null;
  @ApiProperty()
  public addressNumber: string | null;
  @ApiProperty()
  public neighborhood: string | null;
  @ApiProperty()
  public postalCode: string | null;
  @ApiProperty()
  public organizationId: number | null;
  @ApiProperty()
  public pictureUrl: string | null;
  @ApiProperty()
  public bio: string | null;
  @ApiProperty()
  public acceptsCommunication: boolean;
  @ApiProperty()
  public wantsAccountPersonalization: boolean;
  @ApiProperty()
  public genderId: number | null;
  @ApiProperty()
  public goalId: number | null;
  @ApiProperty()
  public mainGoalLevelId: number | null;
  @ApiProperty()
  public nextRegistrationStep: number;
}
