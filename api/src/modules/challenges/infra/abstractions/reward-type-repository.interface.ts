import { Lang } from "@/core/application/locales";
import { RewardTypeDto } from "@/modules/challenges/application/dtos/reward-type.dto";

export interface RewardTypeRepositoryInterface {
  findAll(lang: Lang): Promise<RewardTypeDto[]>;
}