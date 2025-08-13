import { Repository } from "@/core/domain/abstractions/repository.interface";
import {
  FullChallengeDto,
  UserChallengeCheckInDto,
  UserCheckInChallengeDto,
} from "@/modules/challenges/application/dtos/challenge.dto";
import { ChallengeSummaryDto } from "@/modules/challenges/application/dtos/challenge-summary.dto";

export interface BaseChallengeRepository extends Repository<FullChallengeDto> {
  createUserCheckIn: (
    checkIn: UserCheckInChallengeDto,
  ) => Promise<UserChallengeCheckInDto | null>;
  getChallengeSummary: (
    challengeId: number,
  ) => Promise<ChallengeSummaryDto | null>;
}
