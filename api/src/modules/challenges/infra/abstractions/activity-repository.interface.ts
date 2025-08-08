import { Repository } from "@/core/domain/abstractions/repository.interface";
import { ActivityDto } from "@/modules/challenges/application/dtos/activity.dto";

export interface BaseActivityRepository extends Repository<ActivityDto> {}
