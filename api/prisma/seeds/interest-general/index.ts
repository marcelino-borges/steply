import { PrismaClient } from "prisma/client";

const prisma = new PrismaClient();

prisma.interestGeneral
  .createMany({
    data: [
      {
        name: "Physical Fitness",
        lang: "en",
      },
      {
        name: "Mental Health & Wellness",
        lang: "en",
      },
      {
        name: "Nutrition & Healthy Eating",
        lang: "en",
      },
      {
        name: "Sleep & Recovery",
        lang: "en",
      },
      {
        name: "Stress Management",
        lang: "en",
      },
      {
        name: "Weight Management",
        lang: "en",
      },
      {
        name: "Preventive Healthcare",
        lang: "en",
      },
      {
        name: "Healthy Habits & Routines",
        lang: "en",
      },
      {
        name: "Mindfulness & Meditation",
        lang: "en",
      },
      {
        name: "Chronic Disease Management",
        lang: "en",
      },
      {
        name: "Active Lifestyle",
        lang: "en",
      },
      {
        name: "Hydration & Detox",
        lang: "en",
      },

      {
        name: "Condicionamento Físico",
        lang: "pt",
      },
      {
        name: "Saúde Mental & Bem-estar",
        lang: "pt",
      },
      {
        name: "Nutrição & Alimentação Saudável",
        lang: "pt",
      },
      {
        name: "Sono & Recuperação",
        lang: "pt",
      },
      {
        name: "Gerenciamento de Estresse",
        lang: "pt",
      },
      {
        name: "Controle de Peso",
        lang: "pt",
      },
      {
        name: "Cuidados Preventivos",
        lang: "pt",
      },
      {
        name: "Hábitos & Rotinas Saudáveis",
        lang: "pt",
      },
      {
        name: "Mindfulness & Meditação",
        lang: "pt",
      },
      {
        name: "Gerenciamento de Doenças Crônicas",
        lang: "pt",
      },
      {
        name: "Estilo de Vida Ativo",
        lang: "pt",
      },
      {
        name: "Hidratação & Detox",
        lang: "pt",
      },
    ],
  })
  .then(() => {
    console.log("General interests seeded.");
  })
  .catch((error) => {
    console.error("Error seeding general interests", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
