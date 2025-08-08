export const EXISTING_SUGGESTED_ACTIVITY_MOCK = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  title: "Act title",
  description: "Act desc",
  lang: "en",
  active: true,
} as const;

export const SUGGESTED_ACTITIVIES_REPO_MOCK = {
  findAll: jest.fn(),
};
