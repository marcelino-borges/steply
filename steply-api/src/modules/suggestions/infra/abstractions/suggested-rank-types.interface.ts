import { Repository } from "@/core/domain/abstractions/repository.interface";
import { SuggestedRankTypeDto } from "@/modules/suggestions/application/dtos/rank-type-suggested.dto";

export interface BaseSuggestedRankTypesRepository
  extends Repository<SuggestedRankTypeDto> {}
