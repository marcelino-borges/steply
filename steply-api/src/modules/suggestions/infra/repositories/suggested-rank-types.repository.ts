import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { Lang } from "@/core/application/locales";
import { BaseSuggestedRankTypesRepository } from "@/modules/suggestions/infra/abstractions/suggested-rank-types.interface";
import { SuggestedRankTypeDto } from "@/modules/suggestions/application/dtos/rank-type-suggested.dto";

export const RANK_TYPE_SUGGESTIONS_REPOSITORY_TOKEN = Symbol(
  "RankTypesSuggestionsRepository",
);

@Injectable()
export class RankTypesSuggestionsRepository
  implements BaseSuggestedRankTypesRepository
{
  constructor(private readonly db: PrismaService) {}

  async findAll(lang: Lang): Promise<SuggestedRankTypeDto[]> {
    const result = await this.db.suggestedRankType.findMany({
      where: {
        active: true,
        lang,
      },
    });

    return result;
  }
}
