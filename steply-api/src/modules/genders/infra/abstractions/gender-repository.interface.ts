import { GenderDto } from "@/modules/genders/application/dtos/gender.dto";

export interface GenderRepositoryInterface {
  findAll(): Promise<GenderDto[]>;
}
