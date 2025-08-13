import { ChallengeSummaryDto } from "@/modules/challenges/application/dtos/challenge-summary.dto";

export const CHALLENGE_SUMMARY_MOCK: ChallengeSummaryDto = {
  participantCount: 42,
  checkInsToday: 15,
  checkInsTotal: 523,
  mediaCount: 287,
};

export const EMPTY_CHALLENGE_SUMMARY_MOCK: ChallengeSummaryDto = {
  participantCount: 0,
  checkInsToday: 0,
  checkInsTotal: 0,
  mediaCount: 0,
};

export const CHALLENGE_SUMMARY_REPOSITORY_MOCK = {
  getChallengeSummary: jest.fn(),
};