import { Repository } from "@/core/domain/abstractions/repository.interface";
import { SuggestedActivityDto } from "@/modules/suggestions/application/dtos/activity-suggested.dto";

export interface BaseSuggestedActivitiesRepository
  extends Repository<SuggestedActivityDto> {}
