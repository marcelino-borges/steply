import { PrismaClient } from "prisma/client";

const prisma = new PrismaClient();

prisma.country
  .createMany({
    data: [
      {
        abbreviation: "US",
        name: "United States",
        active: true,
        phoneCode: 1,
      },
      {
        abbreviation: "BR",
        name: "Brasil",
        active: true,
        phoneCode: 55,
      },
    ],
  })
  .then(() => {
    console.log("Countries seed successful.");
  })
  .catch((error) => {
    console.error("Error seeding countries", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
