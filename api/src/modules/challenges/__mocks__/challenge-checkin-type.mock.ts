import { ChallengeCheckInTypeDto } from "@/modules/challenges/application/dtos/challenge-checkin-type.dto";
import { ChallengeCheckInTypeCode } from "@/core/domain/entities/challenge-checkin-type";

export const MOCK_CHALLENGE_CHECKIN_TYPES: ChallengeCheckInTypeDto[] = [
  {
    id: 1,
    code: ChallengeCheckInTypeCode.DAILY_DIFFERENT_ACTIVITIES,
    name: "Daily Different Activities",
    description: "Check-in with different activities each day",
    lang: "en",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
  },
  {
    id: 2,
    code: ChallengeCheckInTypeCode.REPEATING_ACTIVITIES,
    name: "Repeating Activities",
    description: "Check-in with same activities repeatedly",
    lang: "en",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
  },
];

export const CHALLENGE_CHECKIN_TYPE_REPOSITORY_MOCK = {
  findAll: jest.fn(),
};