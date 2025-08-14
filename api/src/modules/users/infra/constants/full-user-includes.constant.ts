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
          id: true,
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
          id: true,
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
      checkIns: true,
    },
  },
} as const;
