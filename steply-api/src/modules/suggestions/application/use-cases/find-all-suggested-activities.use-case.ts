import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { Repository } from "@/core/domain/abstractions/repository.interface";
import { ACTIVITIES_SUGGESTIONS_REPOSITORY_TOKEN } from "@/modules/suggestions/infra/repositories/suggested-activities.repository";
import { SuggestedActivityDto } from "@/modules/suggestions/application/dtos/activity-suggested.dto";
import { Lang } from "@/core/application/locales";

@Injectable()
export class FindAllSuggestedActivitiesUseCase extends UseCase<
  [Lang],
  SuggestedActivityDto[]
> {
  constructor(
    @Inject(ACTIVITIES_SUGGESTIONS_REPOSITORY_TOKEN)
    private readonly repo: Repository<SuggestedActivityDto>,
  ) {
    super();
  }

  async execute(lang: Lang): Promise<SuggestedActivityDto[]> {
    return (await this.repo.findAll!(lang)) as SuggestedActivityDto[];
  }
}
