import { ChallengeCheckInTypeDto } from "@/modules/challenges/application/dtos/challenge-checkin-type.dto";

export const MOCK_CHALLENGE_CHECKIN_TYPES: ChallengeCheckInTypeDto[] = [
  {
    id: 1,
    code: 1,
    name: "Daily Check-in",
    description: "Check-in once per day",
    lang: "en",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
  },
  {
    id: 2,
    code: 2,
    name: "Weekly Check-in",
    description: "Check-in once per week",
    lang: "en",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
  },
  {
    id: 3,
    code: 3,
    name: "Milestone Check-in",
    description: "Check-in when reaching specific milestones",
    lang: "en",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
  },
];

export const CHALLENGE_CHECKIN_TYPE_REPOSITORY_MOCK = {
  findAll: jest.fn(),
};