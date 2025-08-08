import { Controller, Get, HttpStatus } from "@nestjs/common";
import { FindAllUserMainGoalLevelsUseCase } from "@/modules/user-main-goal-levels/application/use-cases/find-all-user-main-goal-levels.use-case";
import { UserMainGoalLevelDto } from "@/modules/user-main-goal-levels/application/dtos/user-main-goal-level.dto";
import { EndpointDoc } from "@/core/infra/decorators/swagger-endpoint-doc.decorator";

@Controller("user-main-goal-levels")
export class UserMainGoalLevelController {
  constructor(
    private readonly findAllUserMainGoalLevelsUseCase: FindAllUserMainGoalLevelsUseCase,
  ) {}

  @Get()
  @EndpointDoc({
    operation: {
      summary: "Get all user main goal levels",
    },
    response: {
      status: HttpStatus.OK,
      type: [UserMainGoalLevelDto],
    },
  })
  async findAll(): Promise<UserMainGoalLevelDto[]> {
    return await this.findAllUserMainGoalLevelsUseCase.execute();
  }
}