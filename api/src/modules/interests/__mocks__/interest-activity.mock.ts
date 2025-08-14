import { InterestActivityDto } from "../application/dtos/interest-activity.dto";

export const MOCK_INTEREST_ACTIVITIES: InterestActivityDto[] = [
  {
    id: 1,
    name: "Soccer",
    lang: "en",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "Running",
    lang: "en",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 3,
    name: "Swimming",
    lang: "en",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export const INTEREST_ACTIVITY_REPOSITORY_MOCK = {
  findAll: jest.fn(),
};