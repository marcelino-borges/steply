import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.userMainGoalLevel
  .createMany({
    data: [
      {
        name: "Iniciante",
        description: "Estou começando agora",
        lang: "pt",
      },
      {
        name: "Irregular",
        description: "Treino 1-2 dias na semana",
        lang: "pt",
      },
      {
        name: "Intermediário",
        description: "Treino 3-5 dias na semana",
        lang: "pt",
      },
      {
        name: "Avançado",
        description: "Treino mais de 5 dias na semana",
        lang: "pt",
      },
    ],
  })
  .then(() => {
    console.log("User main goal levels seed successful.");
  })
  .catch((error) => {
    console.error("Error seeding user main goal levels", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });