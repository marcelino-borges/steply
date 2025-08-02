import { Prisma } from "@prisma/client";

import { FULL_USER_CHALLENGE_INCLUDES } from "@/modules/users/infra/constants/full-user-challenge-includes.constant";

const fullChallenge = Prisma.validator<Prisma.UserChallengeDefaultArgs>()({
  include: FULL_USER_CHALLENGE_INCLUDES,
});

export type PrismaUserChallenge = Prisma.UserChallengeGetPayload<
  typeof fullChallenge
>;
