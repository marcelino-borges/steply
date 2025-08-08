import { Controller, Get, HttpStatus } from "@nestjs/common";
import { FindAllGendersUseCase } from "@/modules/genders/application/use-cases/find-all-genders.use-case";
import { GenderDto } from "@/modules/genders/application/dtos/gender.dto";
import { EndpointDoc } from "@/core/infra/decorators/swagger-endpoint-doc.decorator";

@Controller("genders")
export class GenderController {
  constructor(private readonly findAllGendersUseCase: FindAllGendersUseCase) {}

  @Get()
  @EndpointDoc({
    operation: {
      summary: "Get all genders",
    },
    response: {
      status: HttpStatus.OK,
      type: [GenderDto],
    },
  })
  async findAll(): Promise<GenderDto[]> {
    return await this.findAllGendersUseCase.execute();
  }
}
