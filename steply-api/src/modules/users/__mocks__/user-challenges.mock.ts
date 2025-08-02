import { UserChallengeResponseDto } from "@/modules/users/application/dtos/user-challenge.dto";
import { JoinMethod } from "@/core/domain/entities/challenge.entity";

export const EXISTING_USER_CHALLENGE: UserChallengeResponseDto = {
  challengeId: 1,
  userId: 1,
  title: "Chall us",
  description: "Desc chall us",
  startAt: new Date(2020, 5, 22),
  endAt: new Date(2020, 6, 22),
  bannerUrl: "https://banner.com/png",
  isPublic: true,
  joinMethod: JoinMethod.OPEN,
  organizationId: 1,
  interactionCount: 1,
  interactions: [],
  createdAt: new Date(2020, 5, 20),
  updatedAt: new Date(2020, 5, 20),
};

export const USER_CHALLENGES_REPO_MOCK = {
  create: jest.fn(),
  query: jest.fn(),
};
