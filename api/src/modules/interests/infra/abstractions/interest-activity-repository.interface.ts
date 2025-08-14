import { InterestActivityDto } from "@/modules/interests/application/dtos/interest-activity.dto";

export interface InterestActivityRepositoryInterface {
  findAll(lang: string): Promise<InterestActivityDto[]>;
}