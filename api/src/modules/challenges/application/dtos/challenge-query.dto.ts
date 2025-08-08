import { PrismaStringContains } from "@/core/application/dtos/prisma.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ChallengeQueryParamsDto {
  @ApiProperty()
  pageSize?: number;
  @ApiProperty()
  pageNumber?: number;
  @ApiProperty()
  org?: number;
  @ApiProperty()
  search?: string;
}

type ChallengesQueryFreeSearchOr =
  | {
      organization: {
        name: PrismaStringContains;
      };
    }
  | {
      organization: {
        cnpj: PrismaStringContains;
      };
    }
  | {
      title: PrismaStringContains;
    }
  | {
      description: PrismaStringContains;
    };

export class ChallengesQueryBuilderDto {
  private orgId: number;
  private or: ChallengesQueryFreeSearchOr[];

  withOrganizationId(orgId: number) {
    this.orgId = orgId;

    return this;
  }

  withSearch(search: string) {
    this.or = [
      {
        organization: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        organization: {
          cnpj: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];

    return this;
  }

  build() {
    return {
      AND: [
        {
          organization: {
            id: this.orgId,
          },
        },
        {
          OR: this.or,
        },
      ],
    };
  }
}
