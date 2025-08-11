import {
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
} from "@nestjs/common";

import { ZodValidationFactory } from "@/core/infra/factories/zod-validation.factory";
import { intSchema } from "@/core/application/schemas/primitives/number.schema";
import { ActivityDto } from "@/modules/challenges/application/dtos/activity.dto";
import { FindUserActivitiesUseCase } from "@/modules/challenges/application/use-cases/activity/find-user-activities.use-case";
import { Lang } from "@/core/application/locales";
import { EndpointDoc } from "@/core/infra/decorators/swagger-endpoint-doc.decorator";

@Controller("users/:userId/activities")
export class UserActivityController {
  constructor(
    private readonly findUserActivitiesUseCase: FindUserActivitiesUseCase,
  ) {}

  @Get()
  @EndpointDoc({
    operation: {
      summary: "Get all activities that a user has used across all their challenges",
    },
    response: {
      status: HttpStatus.OK,
      type: ActivityDto,
      isArray: true,
    },
  })
  async findUserActivities(
    @Param("userId") userId: string,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedUserId } = ZodValidationFactory.parseOrThrow(
      intSchema,
      userId,
      lang,
    );

    return await this.findUserActivitiesUseCase.execute(parsedUserId);
  }
}