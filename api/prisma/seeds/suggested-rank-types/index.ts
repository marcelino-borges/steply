import { PrismaClient } from "prisma/client";

const prisma = new PrismaClient();

prisma.suggestedRankType
  .createMany({
    data: [
      {
        rank: 1,
        title: "Campeão",
        description: "Primeiro colocado no desafio",
        lang: "pt",
        active: true,
      },
      {
        rank: 2,
        title: "Vice-campeão",
        description: "Segundo colocado no desafio",
        lang: "pt",
        active: true,
      },
      {
        rank: 3,
        title: "Entusiasta",
        description: "Terceiro colocado no desafio",
        lang: "pt",
        active: true,
      },
      {
        rank: 1,
        title: "Champion",
        description: "First position in the challenge",
        lang: "en",
        active: true,
      },
      {
        rank: 2,
        title: "Runner-up",
        description: "Second position in the challenge",
        lang: "en",
        active: true,
      },
      {
        rank: 3,
        title: "Enthusiastic",
        description: "Third position in the challenge",
        lang: "en",
        active: true,
      },
    ],
  })
  .then(() => {
    console.log("Suggested rank types seeded.");
  })
  .catch((error) => {
    console.error("Error seeding suggested rank types", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
