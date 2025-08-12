import { Controller, Get, Headers, HttpStatus } from "@nestjs/common";

import { EndpointDoc } from "@/core/infra/decorators/swagger-endpoint-doc.decorator";
import { Lang } from "@/core/application/locales";
import { RewardTypeDto } from "@/modules/challenges/application/dtos/reward-type.dto";
import { FindAllRewardTypesUseCase } from "@/modules/challenges/application/use-cases/reward-type/find-all-reward-types.use-case";

@Controller("reward-types")
export class RewardTypeController {
  constructor(
    private readonly findAllRewardTypesUseCase: FindAllRewardTypesUseCase,
  ) {}

  @Get()
  @EndpointDoc({
    operation: { summary: "Get all reward types" },
    response: { status: HttpStatus.OK, type: [RewardTypeDto] },
  })
  async findAll(@Headers("lang") lang: Lang = "en"): Promise<RewardTypeDto[]> {
    return await this.findAllRewardTypesUseCase.execute(lang);
  }
}