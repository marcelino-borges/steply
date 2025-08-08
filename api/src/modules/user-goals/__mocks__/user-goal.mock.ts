import { UserGoalDto } from "@/modules/user-goals/application/dtos/user-goal.dto";

export const MOCK_USER_GOALS: UserGoalDto[] = [
  {
    id: 1,
    name: "Criar uma rotina mais ativa",
    lang: "pt",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "Melhorar condicionamento físico",
    lang: "pt",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 3,
    name: "Me divertir com desafios e amigos",
    lang: "pt",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 4,
    name: "Buscar mais saúde e bem-estar",
    lang: "pt",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 5,
    name: "Manter consistência nas atividades",
    lang: "pt",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 6,
    name: "Outro",
    lang: "pt",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export const USER_GOAL_REPOSITORY_MOCK = {
  findAll: jest.fn(),
};
