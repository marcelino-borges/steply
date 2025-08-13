export const CHALLENGE_INCLUDES = {
  organization: {
    select: {
      id: true,
      name: true,
    },
  },
  ownerUser: {
    select: {
      id: true,
      name: true,
      email: true,
      pictureUrl: true,
    },
  },
  reward: {
    include: {
      rewardType: true,
    },
  },
  rankTypes: true,
  activities: true,
  checkInType: true,
};

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;
