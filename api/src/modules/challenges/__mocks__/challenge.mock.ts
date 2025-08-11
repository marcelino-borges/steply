import { JoinMethod } from "@/core/domain/entities/challenge.entity";
import { ChallengeCheckInTypeCode } from "@/core/domain/entities/challenge-checkin-type";
import {
  ChallengeDto,
  FullChallengeDto,
} from "@/modules/challenges/application/dtos/challenge.dto";

export const NON_EXISTING_CHALLENGE_MOCK = {
  organizationId: 1,
  rewardId: 1,
  interactionIncrement: 1,
  title: "Lorem",
  description: "Ipsum Lorem",
  startAt: new Date(2005, 5, 22),
  endAt: new Date(2005, 6, 22),
  isPublic: false,
  joinMethod: JoinMethod.OPEN,
  bannerUrl: "http://url.com",
  tags: ["fitness", "health", "challenge"] as string[],
  checkInEndOfDay: false,
  multipleCheckIns: false,
  checkInTypeCode: ChallengeCheckInTypeCode.DAILY_DIFFERENT_ACTIVITIES,
};

export const EXISTING_CHALLENGE_MOCK: ChallengeDto = {
  ...NON_EXISTING_CHALLENGE_MOCK,
  id: 2,
  createdAt: new Date(2005, 5, 22),
  updatedAt: new Date(2005, 5, 22),
  joinMethod: JoinMethod.OPEN,
};

export const EXISTING_FULL_CHALLENGE_MOCK: FullChallengeDto = {
  ...NON_EXISTING_CHALLENGE_MOCK,
  id: 2,
  createdAt: new Date(2005, 5, 22),
  updatedAt: new Date(2005, 5, 22),
  joinMethod: JoinMethod.OPEN,
  organization: {
    id: 1,
    name: "Xpto",
  },
  reward: {
    id: 1,
    name: "Repto",
    challengeId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    deliveryDetails: "Blabla",
    description: "Desc",
    rewardTypeId: 1,
  },
  rankTypes: [],
  activities: [],
  checkInType: {
    id: 1,
    code: ChallengeCheckInTypeCode.DAILY_DIFFERENT_ACTIVITIES,
    name: "Daily Different Activities",
    description: "Check-in with different activities each day",
    lang: "en",
    createdAt: new Date(2005, 5, 22),
    updatedAt: new Date(2005, 5, 22),
  },
};

export const NON_EXISTING_CHALLENGE_INTERACTION = {
  userId: 1,
  videoUrl: "https://video.com",
};

export const EXISTING_CHALLENGE_INTERACTION = {
  ...NON_EXISTING_CHALLENGE_INTERACTION,
  location: null,
  text: null,
  imageUrl: null,
  challengeId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 1,
};

export const CHALLENGES_REPO_MOCK = {
  create: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  query: jest.fn(),
  createUserInteraction: jest.fn(),
};
