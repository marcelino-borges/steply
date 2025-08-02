import { ApiProperty } from "@nestjs/swagger";
import { Interest } from "@/core/domain/abstractions/interest.interface";

export class GeneralInterest implements Interest {
  @ApiProperty()
  name: string;
  @ApiProperty()
  lang?: string;
}
