import { Inject, Injectable } from "@nestjs/common";
import { ChallengeCheckInTypeRepositoryInterface } from "@/modules/challenges/infra/abstractions/challenge-checkin-type-repository.interface";
import { CHALLENGE_CHECKIN_TYPE_REPOSITORY_TOKEN } from "@/modules/challenges/infra/repositories/challenge-checkin-type.repository";
import { ChallengeCheckInTypeDto } from "@/modules/challenges/application/dtos/challenge-checkin-type.dto";

@Injectable()
export class FindAllChallengeCheckInTypesUseCase {
  constructor(
    @Inject(CHALLENGE_CHECKIN_TYPE_REPOSITORY_TOKEN)
    private readonly challengeCheckInTypeRepository: ChallengeCheckInTypeRepositoryInterface,
  ) {}

  async execute(): Promise<ChallengeCheckInTypeDto[]> {
    return await this.challengeCheckInTypeRepository.findAll();
  }
}