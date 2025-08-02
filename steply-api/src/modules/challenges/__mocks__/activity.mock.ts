export const NON_EXISTING_ACTIVITY = {
  description: "Desc",
  title: "Loremzo",
  startAt: new Date(2005, 5, 22),
  endAt: new Date(2005, 6, 22),
};

export const EXISTING_ACTIVITY = {
  ...NON_EXISTING_ACTIVITY,
  id: 2,
  createdAt: new Date(2005, 5, 22),
  updatedAt: new Date(2005, 5, 22),
  challengeId: 2,
};

export const ACTIVITY_REPO_MOCK = {
  create: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  query: jest.fn(),
  delete: jest.fn(),
};

export const ACTIVITY_USECASE_MOCK = {
  findById: jest.fn(),
  query: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
