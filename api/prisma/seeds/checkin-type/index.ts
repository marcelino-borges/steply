import { PrismaClient } from "prisma/client";

const prisma = new PrismaClient();

prisma.challengeCheckInType
  .createMany({
    data: [
      {
        name: "Personalização por dia",
        description:
          "Defina uma ou mais atividades específicas para cada dia do desafio. Ideal para quem quer personalizar a rotina diária.",
        lang: "pt",
        code: 0,
      },
      {
        name: "Atividades para o período",
        description:
          "Escolha uma ou mais atividades que se repetem todos os dias durante o desafio. Simples, direto e fácil de manter.",
        lang: "pt",
        code: 1,
      },
    ],
  })
  .then(() => {
    console.log("Challenges check-in types seed successful.");
  })
  .catch((error) => {
    console.error("Error seeding challenges check-in types", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
