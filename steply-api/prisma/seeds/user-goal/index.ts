import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.userGoal
  .createMany({
    data: [
      {
        name: "Criar uma rotina mais ativa",
        lang: "pt",
      },
      {
        name: "Melhorar condicionamento físico",
        lang: "pt",
      },
      {
        name: "Me divertir com desafios e amigos",
        lang: "pt",
      },
      {
        name: "Buscar mais saúde e bem-estar",
        lang: "pt",
      },
      {
        name: "Manter consistência nas atividades",
        lang: "pt",
      },
      {
        name: "Outro",
        lang: "pt",
      },
    ],
  })
  .then(() => {
    console.log("User goals seed successful.");
  })
  .catch((error) => {
    console.error("Error seeding user goals", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });