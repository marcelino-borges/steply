import { Controller, Get, HttpStatus, Headers } from "@nestjs/common";
import { FindAllInterestActivitiesUseCase } from "@/modules/interests/application/use-cases/find-all-interest-activities.use-case";
import { InterestActivityDto } from "@/modules/interests/application/dtos/interest-activity.dto";
import { EndpointDoc } from "@/core/infra/decorators/swagger-endpoint-doc.decorator";
import { Lang } from "@/core/application/locales";

@Controller("interests/activities")
export class InterestActivityController {
  constructor(private readonly findAllInterestActivitiesUseCase: FindAllInterestActivitiesUseCase) {}

  @Get()
  @EndpointDoc({
    operation: {
      summary: "Get all interest activities",
    },
    response: {
      status: HttpStatus.OK,
      type: [InterestActivityDto],
    },
  })
  async findAll(@Headers("lang") lang: Lang = "en"): Promise<InterestActivityDto[]> {
    return await this.findAllInterestActivitiesUseCase.execute(lang);
  }
}