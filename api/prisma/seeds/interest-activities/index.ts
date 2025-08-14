import { PrismaClient } from "prisma/client";

const prisma = new PrismaClient();

prisma.interestActivity
  .createMany({
    data: [
      // Portuguese entries
      // {
      //   name: "Corrida / Caminhada",
      //   lang: "pt",
      // },
      // {
      //   name: "Ciclismo",
      //   lang: "pt",
      // },
      // {
      //   name: "Yoga / Alongamento",
      //   lang: "pt",
      // },
      // {
      //   name: "Musculação",
      //   lang: "pt",
      // },
      // {
      //   name: "Esportes coletivos",
      //   lang: "pt",
      // },
      // {
      //   name: "Treinos em casa",
      //   lang: "pt",
      // },
      // {
      //   name: "Atividades ao ar livre",
      //   lang: "pt",
      // },
      // {
      //   name: "Desafios em grupo",
      //   lang: "pt",
      // },
      
      // English entries
      {
        name: "Running / Walking",
        lang: "en",
      },
      {
        name: "Cycling",
        lang: "en",
      },
      {
        name: "Yoga / Stretching",
        lang: "en",
      },
      {
        name: "Weight Training",
        lang: "en",
      },
      {
        name: "Team Sports",
        lang: "en",
      },
      {
        name: "Home Workouts",
        lang: "en",
      },
      {
        name: "Outdoor Activities",
        lang: "en",
      },
      {
        name: "Group Challenges",
        lang: "en",
      },
    ],
  })
  .then(() => {
    console.log("Interest activities seeded.");
  })
  .catch((error) => {
    console.error("Error seeding interest activities", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
