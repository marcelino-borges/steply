import { Controller, Get, HttpStatus, Headers } from "@nestjs/common";
import { FindAllInterestGeneralUseCase } from "@/modules/interests/application/use-cases/find-all-interest-general.use-case";
import { InterestGeneralDto } from "@/modules/interests/application/dtos/interest-general.dto";
import { EndpointDoc } from "@/core/infra/decorators/swagger-endpoint-doc.decorator";
import { Lang } from "@/core/application/locales";

@Controller("interests/general")
export class InterestGeneralController {
  constructor(private readonly findAllInterestGeneralUseCase: FindAllInterestGeneralUseCase) {}

  @Get()
  @EndpointDoc({
    operation: {
      summary: "Get all general interests",
    },
    response: {
      status: HttpStatus.OK,
      type: [InterestGeneralDto],
    },
  })
  async findAll(@Headers("lang") lang: Lang = "en"): Promise<InterestGeneralDto[]> {
    return await this.findAllInterestGeneralUseCase.execute(lang);
  }
}