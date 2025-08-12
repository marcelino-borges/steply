import { PrismaClient } from "prisma/client";

const prisma = new PrismaClient();

prisma.rewardType
  .createMany({
    data: [
      {
        title: "🎉 Chegou, ganhou!",
        description:
          "Recompensa para todos que atingirem o número mínimo de interações.",
        lang: "pt",
        active: true,
        recommended: false,
      },
      {
        title: "📈 Quanto mais, melhor",
        description:
          "Premiação por níveis: quanto mais interações, maior a recompensa.",
        lang: "pt",
        active: true,
        recommended: false,
      },
      {
        title: "🌱 Participação vale mais",
        description:
          "Sem premiação. Aqui, o foco é na jornada, não na competição.",
        lang: "pt",
        active: true,
        recommended: true,
      },
      {
        title: "🎉 You Show Up, You Win!",
        description:
          "Reward for everyone who reaches the minimum number of interactions.",
        lang: "en",
        active: true,
        recommended: false,
      },
      {
        title: "📈 The More, the Better",
        description:
          "Tiered rewards: the more interactions, the bigger the prize.",
        lang: "en",
        active: true,
        recommended: false,
      },
      {
        title: "🌱 Participation Matters Most",
        description:
          "No rewards. Here, the focus is on the journey—not the competition.",
        lang: "en",
        active: true,
        recommended: true,
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
