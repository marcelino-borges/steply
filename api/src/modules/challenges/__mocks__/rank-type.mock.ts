export const NON_EXISTING_RANK_TYPE_MOCK = {
  title: "Rank title",
  description: "Rank description",
  minCheckIns: 10,
  rank: 1,
};

export const EXISTING_RANK_TYPE_MOCK = {
  ...NON_EXISTING_RANK_TYPE_MOCK,
  id: 1,
  createdAt: new Date(2020, 5, 3),
  updatedAt: new Date(2020, 5, 3),
  challengeId: 22,
};

export const RANK_TYPE_REPO_MOCK = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
