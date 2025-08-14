import { Injectable, Inject } from "@nestjs/common";
import { InterestGeneralRepositoryInterface } from "@/modules/interests/infra/abstractions/interest-general-repository.interface";
import { INTEREST_GENERAL_REPOSITORY_TOKEN } from "@/modules/interests/infra/repositories/interest-general.repository";
import { InterestGeneralDto } from "@/modules/interests/application/dtos/interest-general.dto";

@Injectable()
export class FindAllInterestGeneralUseCase {
  constructor(
    @Inject(INTEREST_GENERAL_REPOSITORY_TOKEN)
    private readonly interestGeneralRepository: InterestGeneralRepositoryInterface,
  ) {}

  async execute(lang: string): Promise<InterestGeneralDto[]> {
    return await this.interestGeneralRepository.findAll(lang);
  }
}