export const PRISMA_MOCK = {
  $transaction: jest.fn(),
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  userChallenge: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    findFirst: jest.fn(),
  },
  organization: {
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
  },
  challenge: {
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
  rankType: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  activity: {
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    delete: jest.fn(),
  },
  reward: {
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
  suggestedActivity: {
    findMany: jest.fn(),
  },
  suggestedRankType: {
    findMany: jest.fn(),
  },
  country: {
    findMany: jest.fn(),
  },
  userChallengeInteraction: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  gender: {
    findMany: jest.fn(),
  },
  userGoal: {
    findMany: jest.fn(),
  },
  userMainGoalLevel: {
    findMany: jest.fn(),
  },
  userInterestActivity: {
    findMany: jest.fn(),
    createMany: jest.fn(),
    deleteMany: jest.fn(),
  },
};
