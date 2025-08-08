import { Repository } from "@/core/domain/abstractions/repository.interface";
import { RankTypeDto } from "@/modules/challenges/application/dtos/rank-type.dto";

export interface BaseRankTypeRepository extends Repository<RankTypeDto> {}
