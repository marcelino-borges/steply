import { Injectable, Inject } from "@nestjs/common";
import { InterestActivityRepositoryInterface } from "@/modules/interests/infra/abstractions/interest-activity-repository.interface";
import { INTEREST_ACTIVITY_REPOSITORY_TOKEN } from "@/modules/interests/infra/repositories/interest-activity.repository";
import { InterestActivityDto } from "@/modules/interests/application/dtos/interest-activity.dto";

@Injectable()
export class FindAllInterestActivitiesUseCase {
  constructor(
    @Inject(INTEREST_ACTIVITY_REPOSITORY_TOKEN)
    private readonly interestActivityRepository: InterestActivityRepositoryInterface,
  ) {}

  async execute(lang: string): Promise<InterestActivityDto[]> {
    return await this.interestActivityRepository.findAll(lang);
  }
}