import { Repository } from "@/core/domain/abstractions/repository.interface";
import { RewardDto } from "@/modules/challenges/application/dtos/reward.dto";

export interface BaseRewardRepository extends Repository<RewardDto> {}
