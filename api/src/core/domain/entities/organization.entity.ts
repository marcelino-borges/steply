import { ApiProperty } from "@nestjs/swagger";

export class Organization {
  @ApiProperty()
  public readonly name: string;
  @ApiProperty()
  public readonly cnpj: string;
  @ApiProperty()
  public readonly street: string;
  @ApiProperty()
  public readonly city: string;
  @ApiProperty()
  public readonly state: string;
  @ApiProperty()
  public readonly addressNumber: string;
  @ApiProperty()
  public readonly neighborhood: string;
  @ApiProperty()
  public readonly postalCode: string;
  @ApiProperty()
  public readonly countryId: number;
  @ApiProperty()
  public readonly ownerId: number;
}
