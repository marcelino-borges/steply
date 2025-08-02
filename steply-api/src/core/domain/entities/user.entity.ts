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
  public street: string;
  @ApiProperty()
  public city: string;
  @ApiProperty()
  public state: string;
  @ApiProperty()
  public addressNumber: string;
  @ApiProperty()
  public neighborhood: string;
  @ApiProperty()
  public postalCode: string;
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
