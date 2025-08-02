import { UserMainGoalLevelDto } from "@/modules/user-main-goal-levels/application/dtos/user-main-goal-level.dto";

export const MOCK_USER_MAIN_GOAL_LEVELS: UserMainGoalLevelDto[] = [
  {
    id: 1,
    name: "Iniciante",
    description: "Estou começando agora",
    lang: "pt",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "Irregular",
    description: "Treino 1-2 dias na semana",
    lang: "pt",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 3,
    name: "Intermediário",
    description: "Treino 3-5 dias na semana",
    lang: "pt",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 4,
    name: "Avançado",
    description: "Treino mais de 5 dias na semana",
    lang: "pt",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export const USER_MAIN_GOAL_LEVEL_REPOSITORY_MOCK = {
  findAll: jest.fn(),
};