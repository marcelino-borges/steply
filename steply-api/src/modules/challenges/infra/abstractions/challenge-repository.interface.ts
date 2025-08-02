import { Repository } from "@/core/domain/abstractions/repository.interface";
import {
  FullChallengeDto,
  UserChallengeInteractionDto,
  UserInteractChallengeDto,
} from "@/modules/challenges/application/dtos/challenge.dto";

export interface BaseChallengeRepository extends Repository<FullChallengeDto> {
  createUserInteraction: (
    interaction: UserInteractChallengeDto,
  ) => Promise<UserChallengeInteractionDto | null>;
}
