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
  ownerUserId?: number;
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
      ownerUser: {
        name: PrismaStringContains;
      };
    }
  | {
      ownerUser: {
        email: PrismaStringContains;
      };
    }
  | {
      title: PrismaStringContains;
    }
  | {
      description: PrismaStringContains;
    };

export class ChallengesQueryBuilderDto {
  private orgId?: number;
  private ownerUserId?: number;
  private or: ChallengesQueryFreeSearchOr[];

  withOrganizationId(orgId: number) {
    this.orgId = orgId;

    return this;
  }

  withOwnerUserId(ownerUserId: number) {
    this.ownerUserId = ownerUserId;

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
        ownerUser: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        ownerUser: {
          email: {
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
    const andConditions: any[] = [];
    
    if (this.orgId) {
      andConditions.push({
        organization: {
          id: this.orgId,
        },
      });
    }
    
    if (this.ownerUserId) {
      andConditions.push({
        ownerUser: {
          id: this.ownerUserId,
        },
      });
    }
    
    if (this.or) {
      andConditions.push({
        OR: this.or,
      });
    }
    
    return andConditions.length > 0 ? { AND: andConditions } : {};
  }
}
