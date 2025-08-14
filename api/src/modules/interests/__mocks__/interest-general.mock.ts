import { InterestGeneralDto } from "../application/dtos/interest-general.dto";

export const MOCK_INTEREST_GENERAL: InterestGeneralDto[] = [
  {
    id: 1,
    name: "Physical Fitness",
    lang: "en",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "Mental Health & Wellness",
    lang: "en",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 3,
    name: "Nutrition & Healthy Eating",
    lang: "en",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export const INTEREST_GENERAL_REPOSITORY_MOCK = {
  findAll: jest.fn(),
};