import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.suggestedActivity
  .createMany({
    data: [
      {
        title: "Atividade 1",
        description: "Atividade 1",
        lang: "pt",
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
