export const EXISTING_SUGGESTED_RANK_TYPE_MOCK = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  title: "Act title",
  description: "Act desc",
  lang: "en",
  active: true,
  rank: 1,
};

export const SUGGESTED_RANK_TYPES_REPO_MOCK = {
  findAll: jest.fn(),
};
