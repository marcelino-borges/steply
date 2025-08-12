export const NON_EXISTING_REWARD = {
  rewardTypeId: 1,
  deliveryDetails: "Details",
  name: "Reward",
  description: "Desc",
  imageUrl: "http://image.com",
  filesUrls: ["http://file1.com"],
};

export const EXISTING_REWARD = {
  ...NON_EXISTING_REWARD,
  id: 1,
  challengeId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const REWARD_REPO_MOCK = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
};
