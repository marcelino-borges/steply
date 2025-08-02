import {
  FullUserResponseDto,
  UserDto,
} from "@/modules/users/application/dtos/user.dto";

export const NON_EXISTING_USER = {
  countryId: 1,
  name: "John Doe",
  email: "email@email.com",
  phone: "+1234567890",
  street: "John st.",
  city: "Manaui",
  state: "Miuy",
  bio: "Raskoven bio",
  addressNumber: "123A",
  neighborhood: "Johnsons",
  postalCode: "123456789",
  organizationId: null,
  pictureUrl: "https://pic.com/png",
  acceptsCommunication: true,
  wantsAccountPersonalization: false,
  genderId: null,
  goalId: null,
  mainGoalLevelId: null,
  nextRegistrationStep: 0,
};

export const EXISTING_USER: UserDto = {
  ...NON_EXISTING_USER,
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const EXISTING_FULL_USER: FullUserResponseDto = {
  ...NON_EXISTING_USER,
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  pictureUrl: "https://pic.com/png",
  country: {
    id: 1,
    name: "Brasil",
    abbreviation: "BR",
    phoneCode: 55,
  },
  organization: {
    id: 2,
    name: "Teste Org",
  },
};

export const USER_REPO_MOCK = {
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  joinChallenge: jest.fn(),
  listUserChallenges: jest.fn(),
};
