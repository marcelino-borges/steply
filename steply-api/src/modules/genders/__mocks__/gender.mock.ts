import { GenderDto } from "../application/dtos/gender.dto";

export const MOCK_GENDERS: GenderDto[] = [
  {
    id: 0,
    name: "Prefiro não dizer",
    description: "Opção para usuários que preferem não informar seu gênero",
    lang: "pt",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 1,
    name: "Homem",
    description: "Identidade de gênero masculina",
    lang: "pt",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "Mulher",
    description: "Identidade de gênero feminina",
    lang: "pt",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export const GENDER_REPOSITORY_MOCK = {
  findAll: jest.fn(),
};