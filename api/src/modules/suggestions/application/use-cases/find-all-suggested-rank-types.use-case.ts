import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { Repository } from "@/core/domain/abstractions/repository.interface";
import { Lang } from "@/core/application/locales";
import { SuggestedRankTypeDto } from "@/modules/suggestions/application/dtos/rank-type-suggested.dto";
import { RANK_TYPE_SUGGESTIONS_REPOSITORY_TOKEN } from "@/modules/suggestions/infra/repositories/suggested-rank-types.repository";

@Injectable()
export class FindAllSuggestedRankTypesUseCase extends UseCase<
  [Lang],
  SuggestedRankTypeDto[]
> {
  constructor(
    @Inject(RANK_TYPE_SUGGESTIONS_REPOSITORY_TOKEN)
    private readonly repo: Repository<SuggestedRankTypeDto>,
  ) {
    super();
  }

  async execute(lang: Lang): Promise<SuggestedRankTypeDto[]> {
    return (await this.repo.findAll!(lang)) as SuggestedRankTypeDto[];
  }
}
