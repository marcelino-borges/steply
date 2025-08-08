import { Prisma } from "prisma/client";

import { FULL_USER_INCLUDES } from "@/modules/users/infra/constants/full-user-includes.constant";

const fullUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: FULL_USER_INCLUDES,
});

export type PrismaFullUser = Prisma.UserGetPayload<typeof fullUser>;
