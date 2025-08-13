import { Repository } from "@/core/domain/abstractions/repository.interface";
import {
  FullChallengeDto,
  UserChallengeCheckInDto,
  UserCheckInChallengeDto,
} from "@/modules/challenges/application/dtos/challenge.dto";

export interface BaseChallengeRepository extends Repository<FullChallengeDto> {
  createUserCheckIn: (
    interaction: UserCheckInChallengeDto,
  ) => Promise<UserChallengeCheckInDto | null>;
}
