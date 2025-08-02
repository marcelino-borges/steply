import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";

import { ZodValidationFactory } from "@/core/infra/factories/zod-validation.factory";
import { challengeIdParamsSchema } from "@/core/application/schemas/challenge.schema";
import {
  activityByIdSchema,
  createActivitySchema,
  queryActivitiesSchema,
  updateActivitySchema,
} from "@/core/application/schemas/activity.schema";
import { ChallengeIdParamsDto } from "@/modules/challenges/application/dtos/challenge.dto";
import { CreateActivityUseCase } from "@/modules/challenges/application/use-cases/activity/create-activity.use-case";
import { UpdateActivityUseCase } from "@/modules/challenges/application/use-cases/activity/update-activity.use-case";
import { DeleteActivityUseCase } from "@/modules/challenges/application/use-cases/activity/delete-activity.use-case";
import {
  ActivityDto,
  ActivityByIdParamsDto,
  NonExistingActivityDto,
  UpdateActivityDto,
} from "@/modules/challenges/application/dtos/activity.dto";
import { ActivityQueryParamsDto } from "@/modules/challenges/application/dtos/activity-query.dto";
import { FindActivityByIdUseCase } from "@/modules/challenges/application/use-cases/activity/find-activity-by-id.use-case";
import { QueryActivitiesUseCase } from "@/modules/challenges/application/use-cases/activity/query-activities.use-case";
import { Lang, t } from "@/core/application/locales";
import { EndpointDoc } from "@/core/infra/decorators/swagger-endpoint-doc.decorator";
import { stringSchema } from "@/core/application/schemas/primitives/string.schema";
import { intSchema } from "@/core/application/schemas/primitives/number.schema";
import { ZodError } from "zod";

@Controller("challenges/:challengeId/activities")
export class ActivityController {
  constructor(
    private readonly createUseCase: CreateActivityUseCase,
    private readonly updateUseCase: UpdateActivityUseCase,
    private readonly deleteUseCase: DeleteActivityUseCase,
    private readonly findByIdUseCase: FindActivityByIdUseCase,
    private readonly queryUseCase: QueryActivitiesUseCase,
  ) {}

  @Get(":activityId")
  @EndpointDoc({
    operation: {
      summary: "Get an activity by ID",
    },
    response: {
      status: HttpStatus.OK,
      type: ActivityDto,
    },
  })
  async findById(
    @Param() params: ActivityByIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedParams } = ZodValidationFactory.parseOrThrow(
      activityByIdSchema,
      params,
      lang,
    );

    const found = await this.findByIdUseCase.execute(
      parsedParams.activityId,
      parsedParams.challengeId,
    );

    if (!found) {
      throw new BadRequestException(t(lang as Lang).activity.notFound);
    }

    return found;
  }

  @Get()
  @EndpointDoc({
    operation: {
      summary: "Query activities by search params",
    },
    response: {
      status: HttpStatus.OK,
      type: ActivityDto,
      isArray: true,
    },
  })
  async query(
    @Query() query: ActivityQueryParamsDto,
    @Headers("lang") lang: Lang = "en",
    @Param("challengeId") challengeId?: string,
  ) {
    const { data: parsedChallengeId } = ZodValidationFactory.parseOrThrow(
      intSchema,
      challengeId,
      lang,
    );

    const { data: parsedQuery } = ZodValidationFactory.parseOrThrow(
      queryActivitiesSchema,
      query,
      lang,
    );

    return await this.queryUseCase.execute(parsedChallengeId, parsedQuery);
  }

  @Post()
  @EndpointDoc({
    operation: {
      summary: "Create a new activity",
    },
    response: {
      status: HttpStatus.CREATED,
      type: ActivityDto,
    },
  })
  async create(
    @Body() body: NonExistingActivityDto,
    @Param() params: ChallengeIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedBody } = ZodValidationFactory.parseOrThrow(
      createActivitySchema,
      body,
      lang,
    );
    const { data: parsedParams } = ZodValidationFactory.parseOrThrow(
      challengeIdParamsSchema,
      params,
      lang,
    );

    return await this.createUseCase.execute(
      parsedBody,
      parsedParams.challengeId,
    );
  }

  @Put()
  @EndpointDoc({
    operation: {
      summary: "Update an existing activity",
    },
    response: {
      status: HttpStatus.OK,
      type: ActivityDto,
    },
  })
  async update(
    @Body() body: UpdateActivityDto,
    @Param() params: ChallengeIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedBody } = ZodValidationFactory.parseOrThrow(
      updateActivitySchema,
      body,
      lang,
    );
    const { data: parsedParams } = ZodValidationFactory.parseOrThrow(
      challengeIdParamsSchema,
      params,
      lang,
    );

    return await this.updateUseCase.execute({
      ...parsedBody,
      challengeId: parsedParams.challengeId,
    });
  }

  @Delete(":activityId")
  @EndpointDoc({
    operation: {
      summary: "Delete an existing activity",
    },
    response: {
      status: HttpStatus.NO_CONTENT,
    },
  })
  async delete(
    @Param() params: ActivityByIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedParams } = ZodValidationFactory.parseOrThrow(
      activityByIdSchema,
      params,
      lang,
    );

    await this.deleteUseCase.execute(
      parsedParams.activityId,
      parsedParams.challengeId,
    );
  }
}
