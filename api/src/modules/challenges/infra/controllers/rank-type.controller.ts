import {
  Body,
  Controller,
  Delete,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";

import { ZodValidationFactory } from "@/core/infra/factories/zod-validation.factory";
import { challengeIdParamsSchema } from "@/core/application/schemas/challenge.schema";
import { Lang } from "@/core/application/locales";
import { EndpointDoc } from "@/core/infra/decorators/swagger-endpoint-doc.decorator";
import { ChallengeIdParamsDto } from "@/modules/challenges/application/dtos/challenge.dto";
import { CreateRankTypeUseCase } from "@/modules/challenges/application/use-cases/rank-type/create-rank-type.use-case";
import { UpdateRankTypeUseCase } from "@/modules/challenges/application/use-cases/rank-type/update-rank-type.use-case";
import { DeleteRankTypeUseCase } from "@/modules/challenges/application/use-cases/rank-type/delete-rank-type.use-case";
import {
  createRankTypeSchema,
  deleteRankTypeParamsSchema,
  updateRankTypeSchema,
} from "@/core/application/schemas/rank-type.schema";
import {
  NonExistingRankTypeDto,
  RankTypeDto,
  RankTypeIdParam,
  UpdateRankTypeDto,
} from "@/modules/challenges/application/dtos/rank-type.dto";

@Controller("challenges/:challengeId/rank-types")
export class RankTypeController {
  constructor(
    private readonly createUseCase: CreateRankTypeUseCase,
    private readonly updateUseCase: UpdateRankTypeUseCase,
    private readonly deleteUseCase: DeleteRankTypeUseCase,
  ) {}

  @Post()
  @EndpointDoc({
    operation: {
      summary: "Create a new rank type for an existing challenge",
    },
    response: {
      status: HttpStatus.CREATED,
      type: RankTypeDto,
    },
  })
  async create(
    @Body() body: NonExistingRankTypeDto,
    @Param() params: ChallengeIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedBody } = ZodValidationFactory.parseOrThrow(
      createRankTypeSchema,
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
      summary: "Update an existing rank type from an existing challenge",
    },
    response: {
      status: HttpStatus.OK,
      type: RankTypeDto,
    },
  })
  async update(
    @Body() body: UpdateRankTypeDto,
    @Param() params: ChallengeIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedBody } = ZodValidationFactory.parseOrThrow(
      updateRankTypeSchema,
      body,
      lang,
    );
    const { data: parsedParams } = ZodValidationFactory.parseOrThrow(
      challengeIdParamsSchema,
      params,
      lang,
    );

    return await this.updateUseCase.execute(
      parsedBody,
      parsedParams.challengeId,
    );
  }

  @Delete(":rankTypeId")
  @EndpointDoc({
    operation: {
      summary: "Deletes an existing rank type from an existing challenge",
    },
    response: {
      status: HttpStatus.NO_CONTENT,
    },
  })
  async delete(
    @Param() params: RankTypeIdParam,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedParams } = ZodValidationFactory.parseOrThrow(
      deleteRankTypeParamsSchema,
      params,
      lang,
    );

    await this.deleteUseCase.execute(
      parsedParams.rankTypeId,
      parsedParams.challengeId,
    );
  }
}
