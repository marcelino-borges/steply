export type PrismaStringContains =
  | string
  | {
      contains: string;
      mode: "insensitive";
    };
