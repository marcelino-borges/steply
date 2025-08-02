import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { Lang } from "@/core/application/locales";
import { SuggestedActivityDto } from "@/modules/suggestions/application/dtos/activity-suggested.dto";
import { BaseSuggestedActivitiesRepository } from "@/modules/suggestions/infra/abstractions/suggested-activities.interface";

export const ACTIVITIES_SUGGESTIONS_REPOSITORY_TOKEN = Symbol(
  "ActivitiesSuggestionsRepository",
);

@Injectable()
export class ActivitiesSuggestionsRepository
  implements BaseSuggestedActivitiesRepository
{
  constructor(private readonly db: PrismaService) {}

  async findAll(lang: Lang): Promise<SuggestedActivityDto[]> {
    const result = await this.db.suggestedActivity.findMany({
      where: {
        active: true,
        lang,
      },
    });

    return result;
  }
}
