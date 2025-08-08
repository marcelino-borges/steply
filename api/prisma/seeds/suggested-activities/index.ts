import { PrismaClient } from "prisma/client";

const prisma = new PrismaClient();

prisma.suggestedActivity
  .createMany({
    data: [
      {
        title: "Corrida / Caminhada",
        description: "Atividades de corrida e caminhada ao ar livre ou em esteira",
        lang: "pt",
        active: true,
      },
      {
        title: "Ciclismo",
        description: "Pedalar ao ar livre ou em bicicleta ergométrica",
        lang: "pt",
        active: true,
      },
      {
        title: "Yoga / Alongamento",
        description: "Práticas de yoga, alongamento e flexibilidade",
        lang: "pt",
        active: true,
      },
      {
        title: "Musculação",
        description: "Treinos com pesos e exercícios de força",
        lang: "pt",
        active: true,
      },
      {
        title: "Esportes coletivos",
        description: "Futebol, vôlei, basquete e outros esportes em equipe",
        lang: "pt",
        active: true,
      },
      {
        title: "Treinos em casa",
        description: "Exercícios que podem ser feitos em casa sem equipamentos",
        lang: "pt",
        active: true,
      },
      {
        title: "Atividades ao ar livre",
        description: "Trilhas, escalada, natação e outras atividades na natureza",
        lang: "pt",
        active: true,
      },
      {
        title: "Desafios em grupo",
        description: "Competições e desafios realizados com outras pessoas",
        lang: "pt",
        active: true,
      },
    ],
  })
  .then(() => {
    console.log("Suggested activities seeded.");
  })
  .catch((error) => {
    console.error("Error seeding suggested activities", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });