import { Controller, Get, HttpStatus } from "@nestjs/common";
import { FindAllUserGoalsUseCase } from "@/modules/user-goals/application/use-cases/find-all-user-goals.use-case";
import { UserGoalDto } from "@/modules/user-goals/application/dtos/user-goal.dto";
import { EndpointDoc } from "@/core/infra/decorators/swagger-endpoint-doc.decorator";

@Controller("user-goals")
export class UserGoalController {
  constructor(
    private readonly findAllUserGoalsUseCase: FindAllUserGoalsUseCase,
  ) {}

  @Get()
  @EndpointDoc({
    operation: {
      summary: "Get all user goals",
    },
    response: {
      status: HttpStatus.OK,
      type: [UserGoalDto],
    },
  })
  async findAll(): Promise<UserGoalDto[]> {
    return await this.findAllUserGoalsUseCase.execute();
  }
}
