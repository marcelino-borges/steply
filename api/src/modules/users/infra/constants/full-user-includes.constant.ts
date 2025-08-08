import { FULL_USER_CHALLENGE_INCLUDES } from "./full-user-challenge-includes.constant";

export const FULL_USER_INCLUDES = {
  organization: {
    select: {
      id: true,
      name: true,
    },
  },
  country: {
    select: {
      id: true,
      name: true,
      abbreviation: true,
      phoneCode: true,
    },
  },
  activityInterests: {
    include: {
      interestActivity: {
        select: {
          name: true,
        },
      },
    },
  },
  badges: {
    include: {
      badge: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  generalInterests: {
    include: {
      interestGeneral: {
        select: {
          name: true,
        },
      },
    },
  },
  ownedOrganization: {
    select: {
      id: true,
      name: true,
    },
  },
  userChallenges: {
    include: {
      challenge: {
        include: {
          reward: true,
        },
      },
      interactions: true,
    },
  },
} as const;
