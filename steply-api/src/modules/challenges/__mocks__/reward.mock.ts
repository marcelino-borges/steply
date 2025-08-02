export const NON_EXISTING_REWARD = {
  rewardTypeId: 1,
  deliveryDetails: "Details",
  name: "Reward",
  description: "Desc",
};

export const EXISTING_REWARD = {
  ...NON_EXISTING_REWARD,
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  challengeId: 2,
};

export const REWARD_REPO_MOCK = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
};
