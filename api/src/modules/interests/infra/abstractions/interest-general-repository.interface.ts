import { InterestGeneralDto } from "@/modules/interests/application/dtos/interest-general.dto";

export interface InterestGeneralRepositoryInterface {
  findAll(lang: string): Promise<InterestGeneralDto[]>;
}