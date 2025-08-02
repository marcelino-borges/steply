import { Repository } from "@/core/domain/abstractions/repository.interface";
import { UserChallengeResponseDto } from "@/modules/users/application/dtos/user-challenge.dto";

export interface BaseUserChallengeRepository
  extends Repository<UserChallengeResponseDto> {}
