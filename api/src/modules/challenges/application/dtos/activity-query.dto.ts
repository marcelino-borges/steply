import { PrismaStringContains } from "@/core/application/dtos/prisma.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ActivityQueryParamsDto {
  @ApiProperty()
  searchActivity?: string;
  @ApiProperty()
  searchChallenge?: string;
  @ApiProperty()
  startAt?: Date;
  @ApiProperty()
  endAt?: Date;
  @ApiProperty()
  pageNumber?: number;
  @ApiProperty()
  pageSize?: number;
}

type ChallengeOr =
  | {
      description: PrismaStringContains;
    }
  | {
      title: PrismaStringContains;
    };

type ActivityOr =
  | {
      title: PrismaStringContains;
    }
  | {
      description: PrismaStringContains;
    }
  | {
      challenge: {
        OR: ChallengeOr[];
      };
    };

type ActivityAnd =
  | {
      challengeId: number;
    }
  | {
      startAt: {
        equals: Date;
      };
    }
  | {
      endAt: {
        equals: Date;
      };
    }
  | {
      OR: ActivityOr[];
    };

export class ActivitiesQueryBuilderDto {
  private challengeOr: ChallengeOr[];
  private activityAnd: ActivityAnd[];
  private activityOr: ActivityOr[];

  constructor(params?: ActivityQueryParamsDto) {
    this.challengeOr = [];
    this.activityAnd = [];
    this.activityOr = [];

    if (params?.searchChallenge) {
      this.challengeOr = [
        {
          title: {
            contains: params.searchChallenge,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: params.searchChallenge,
            mode: "insensitive",
          },
        },
      ];
    }

    if (params?.startAt) {
      this.activityAnd.push({
        startAt: {
          equals: params.startAt,
        },
      });
    }

    if (params?.endAt) {
      this.activityAnd.push({
        endAt: {
          equals: params.endAt,
        },
      });
    }

    if (params?.searchActivity) {
      this.activityOr = [
        {
          title: {
            contains: params.searchActivity,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: params.searchActivity,
            mode: "insensitive",
          },
        },
      ];
    }

    this.activityOr.push({ challenge: { OR: this.challengeOr } });
    this.activityAnd.push({ OR: this.activityOr });
  }

  build(challengeId: number) {
    const where = {
      AND: this.activityAnd,
      challengeId,
    };

    return where;
  }
}
