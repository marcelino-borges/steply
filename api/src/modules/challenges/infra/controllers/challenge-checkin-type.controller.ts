import { Controller, Get, HttpStatus } from "@nestjs/common";
import { FindAllChallengeCheckInTypesUseCase } from "@/modules/challenges/application/use-cases/challenge-checkin-type/find-all-challenge-checkin-types.use-case";
import { ChallengeCheckInTypeDto } from "@/modules/challenges/application/dtos/challenge-checkin-type.dto";
import { EndpointDoc } from "@/core/infra/decorators/swagger-endpoint-doc.decorator";

@Controller("challenge-checkin-types")
export class ChallengeCheckInTypeController {
  constructor(
    private readonly findAllChallengeCheckInTypesUseCase: FindAllChallengeCheckInTypesUseCase,
  ) {}

  @Get()
  @EndpointDoc({
    operation: {
      summary: "Get all challenge check-in types",
    },
    response: {
      status: HttpStatus.OK,
      type: [ChallengeCheckInTypeDto],
    },
  })
  async findAll(): Promise<ChallengeCheckInTypeDto[]> {
    return await this.findAllChallengeCheckInTypesUseCase.execute();
  }
}