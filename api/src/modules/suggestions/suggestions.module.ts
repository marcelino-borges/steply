import { Module } from "@nestjs/common";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { SuggestionsController } from "@/modules/suggestions/infra/controllers/suggestions.controller";
import { FindAllSuggestedActivitiesUseCase } from "@/modules/suggestions/application/use-cases/find-all-suggested-activities.use-case";
import { FindAllSuggestedRankTypesUseCase } from "@/modules/suggestions/application/use-cases/find-all-suggested-rank-types.use-case";
import { 
  ActivitiesSuggestionsRepository,
  ACTIVITIES_SUGGESTIONS_REPOSITORY_TOKEN 
} from "@/modules/suggestions/infra/repositories/suggested-activities.repository";
import { 
  RankTypesSuggestionsRepository,
  RANK_TYPE_SUGGESTIONS_REPOSITORY_TOKEN 
} from "@/modules/suggestions/infra/repositories/suggested-rank-types.repository";

@Module({
  controllers: [SuggestionsController],
  providers: [
    PrismaService,
    FindAllSuggestedActivitiesUseCase,
    FindAllSuggestedRankTypesUseCase,
    {
      provide: ACTIVITIES_SUGGESTIONS_REPOSITORY_TOKEN,
      useClass: ActivitiesSuggestionsRepository,
    },
    {
      provide: RANK_TYPE_SUGGESTIONS_REPOSITORY_TOKEN,
      useClass: RankTypesSuggestionsRepository,
    },
  ],
})
export class SuggestionsModule {}