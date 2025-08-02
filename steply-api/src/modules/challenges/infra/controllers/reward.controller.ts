import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";

import { ZodValidationFactory } from "@/core/infra/factories/zod-validation.factory";
import { challengeIdParamsSchema } from "@/core/application/schemas/challenge.schema";
import {
  createRewardSchema,
  rewardByIdSchema,
  updateRewardSchema,
} from "@/core/application/schemas/reward.schema";
import { EndpointDoc } from "@/core/infra/decorators/swagger-endpoint-doc.decorator";
import { Lang } from "@/core/application/locales";
import { ChallengeIdParamsDto } from "@/modules/challenges/application/dtos/challenge.dto";
import { CreateRewardUseCase } from "@/modules/challenges/application/use-cases/reward/create-reward.use-case";
import { UpdateRewardUseCase } from "@/modules/challenges/application/use-cases/reward/update-reward.use-case";
import { DeleteRewardUseCase } from "@/modules/challenges/application/use-cases/reward/delete-reward.use-case";
import { FindAllRewardsUseCase } from "@/modules/challenges/application/use-cases/reward/find-all-rewards.use-case";
import {
  NonExistingRewardDto,
  RewardByIdParamsDto,
  RewardDto,
  UpdateRewardDto,
} from "@/modules/challenges/application/dtos/reward.dto";

@Controller("challenges/:challengeId/rewards")
export class RewardController {
  constructor(
    private readonly findAllUseCase: FindAllRewardsUseCase,
    private readonly createUseCase: CreateRewardUseCase,
    private readonly updateUseCase: UpdateRewardUseCase,
    private readonly deleteUseCase: DeleteRewardUseCase,
  ) {}

  @Get()
  @EndpointDoc({
    operation: {
      summary: "List all rewards from an existing challenge",
    },
    response: {
      status: HttpStatus.OK,
      type: RewardDto,
      isArray: true,
    },
  })
  async findAll(
    @Param() params: ChallengeIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedParams } = ZodValidationFactory.parseOrThrow(
      challengeIdParamsSchema,
      params,
      lang,
    );

    return await this.findAllUseCase.execute(parsedParams.challengeId);
  }

  @Post()
  @EndpointDoc({
    operation: {
      summary: "Create a new reward for an existing challenge",
    },
    response: {
      status: HttpStatus.CREATED,
      type: RewardDto,
    },
  })
  async create(
    @Body() body: NonExistingRewardDto,
    @Param() params: ChallengeIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedBody } = ZodValidationFactory.parseOrThrow(
      createRewardSchema,
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
      summary: "Update an existing reward for an existing challenge",
    },
    response: {
      status: HttpStatus.OK,
      type: RewardDto,
    },
  })
  async update(
    @Body() body: UpdateRewardDto,
    @Param() params: ChallengeIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedBody } = ZodValidationFactory.parseOrThrow(
      updateRewardSchema,
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

  @Delete(":rewardId")
  async delete(
    @Param() params: RewardByIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedParams } = ZodValidationFactory.parseOrThrow(
      rewardByIdSchema,
      params,
      lang,
    );

    await this.deleteUseCase.execute(
      parsedParams.rewardId,
      parsedParams.challengeId,
    );
  }
}
