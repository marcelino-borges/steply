import { ChallengeCheckInTypeDto } from "@/modules/challenges/application/dtos/challenge-checkin-type.dto";

export interface ChallengeCheckInTypeRepositoryInterface {
  findAll(): Promise<ChallengeCheckInTypeDto[]>;
}