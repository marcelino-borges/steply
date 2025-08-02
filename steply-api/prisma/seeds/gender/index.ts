import { UserGender } from "@/core/domain/entities/user-gender";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.gender
  .createMany({
    data: [
      {
        id: UserGender.NOT_INFORMED,
        name: "Prefiro não dizer",
        description: "Opção para usuários que preferem não informar seu gênero",
        lang: "pt",
      },
      {
        id: UserGender.MALE,
        name: "Homem",
        description: "Identidade de gênero masculina",
        lang: "pt",
      },
      {
        id: UserGender.FEMALE,
        name: "Mulher",
        description: "Identidade de gênero feminina",
        lang: "pt",
      },
      {
        id: UserGender.NON_BINARY,
        name: "Não binário",
        description:
          "Identidade de gênero que não se enquadra exclusivamente nas categorias masculina ou feminina",
        lang: "pt",
      },
      {
        id: UserGender.OTHER,
        name: "Outro",
        description:
          "Outras identidades de gênero não especificadas nas opções anteriores",
        lang: "pt",
      },
    ],
  })
  .then(() => {
    console.log("Genders seed successful.");
  })
  .catch((error) => {
    console.error("Error seeding genders", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
