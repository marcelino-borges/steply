import { Repository } from "@/core/domain/abstractions/repository.interface";
import { FullUserResponseDto } from "@/modules/users/application/dtos/user.dto";

export interface BaseUserRepository extends Repository<FullUserResponseDto> {
  findByEmail?(email: string): Promise<FullUserResponseDto | null>;
}
