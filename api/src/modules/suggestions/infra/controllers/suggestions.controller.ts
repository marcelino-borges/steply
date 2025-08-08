import { Controller, Get, Headers } from "@nestjs/common";

import { Lang } from "@/core/application/locales";
import { FindAllSuggestedActivitiesUseCase } from "@/modules/suggestions/application/use-cases/find-all-suggested-activities.use-case";
import { FindAllSuggestedRankTypesUseCase } from "@/modules/suggestions/application/use-cases/find-all-suggested-rank-types.use-case";

@Controller("suggestions")
export class SuggestionsController {
  constructor(
    private readonly activitiesUseCase: FindAllSuggestedActivitiesUseCase,
    private readonly rankTypesUseCase: FindAllSuggestedRankTypesUseCase,
  ) {}

  @Get("activities")
  async findAllSuggestedActivities(@Headers("lang") lang: Lang = "en") {
    return await this.activitiesUseCase.execute(lang);
  }

  @Get("rank-types")
  async findAllSuggestedRankTypes(@Headers("lang") lang: Lang = "en") {
    return await this.rankTypesUseCase.execute(lang);
  }
}
