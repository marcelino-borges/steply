import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";

import { ZodValidationFactory } from "@/core/infra/factories/zod-validation.factory";
import {
  createChallengeSchema,
  challengeIdParamsSchema,
  queryChallengesSchema,
  updateChallengeSchema,
  userInteractChallengeSchema,
} from "@/core/application/schemas/challenge.schema";
import { EndpointDoc } from "@/core/infra/decorators/swagger-endpoint-doc.decorator";
import { Lang, t } from "@/core/application/locales";
import {
  ChallengeIdParamsDto,
  NonExistingChallengeDto,
  UpdateChallengeDto,
  UserInteractChallengeBodyDto,
} from "@/modules/challenges/application/dtos/challenge.dto";
import { CreateChallengeUseCase } from "@/modules/challenges/application/use-cases/challenge/create-challenge.use-case";
import { UpdateChallengeUseCase } from "@/modules/challenges/application/use-cases/challenge/update-challenge.use-case";
import { FindChallengeByIdUseCase } from "@/modules/challenges/application/use-cases/challenge/find-challenge-by-id.use-case";
import { QueryChallengesUseCase } from "@/modules/challenges/application/use-cases/challenge/query-challenges.use-case";
import { ChallengeQueryParamsDto } from "@/modules/challenges/application/dtos/challenge-query.dto";
import { FullChallengeDto } from "@/modules/challenges/application/dtos/challenge.dto";
import { UserInteractChallengeUseCase } from "@/modules/challenges/application/use-cases/challenge/user-interact-challenge.use-case";

@Controller("challenges")
export class ChallengeController {
  constructor(
    private readonly createUseCase: CreateChallengeUseCase,
    private readonly updateUseCase: UpdateChallengeUseCase,
    private readonly findByIdUseCase: FindChallengeByIdUseCase,
    private readonly queryUseCase: QueryChallengesUseCase,
    private readonly userInteractUseCase: UserInteractChallengeUseCase,
  ) {}

  @Get(":challengeId")
  @EndpointDoc({
    operation: {
      summary: "Get a challenge by ID",
    },
    response: {
      status: HttpStatus.OK,
      type: FullChallengeDto,
    },
  })
  async findById(
    @Param() params: ChallengeIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedParams } = ZodValidationFactory.parseOrThrow(
      challengeIdParamsSchema,
      params,
    );

    const challengeFound = await this.findByIdUseCase.execute(
      parsedParams.challengeId,
    );

    if (!challengeFound) {
      throw new BadRequestException(t(lang as Lang).challenge.notFound);
    }

    return challengeFound;
  }

  @Get()
  @EndpointDoc({
    operation: {
      summary: "Query challenges by search params",
    },
    response: {
      status: HttpStatus.OK,
      type: FullChallengeDto,
      isArray: true,
    },
  })
  async query(
    @Query() query: ChallengeQueryParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedQuery } = ZodValidationFactory.parseOrThrow(
      queryChallengesSchema,
      query,
      lang,
    );

    return await this.queryUseCase.execute(parsedQuery);
  }

  @Post()
  @EndpointDoc({
    operation: {
      summary: "Create a new challenge",
    },
    response: {
      status: HttpStatus.CREATED,
      type: FullChallengeDto,
    },
    body: { type: NonExistingChallengeDto },
  })
  async create(
    @Body() body: NonExistingChallengeDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedBody } = ZodValidationFactory.parseOrThrow(
      createChallengeSchema,
      body,
      lang,
    );

    return await this.createUseCase.execute(parsedBody);
  }

  @Put()
  @EndpointDoc({
    operation: {
      summary: "Update an existing challenge",
    },
    response: {
      status: HttpStatus.OK,
      type: FullChallengeDto,
    },
  })
  async update(
    @Body() body: UpdateChallengeDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedBody } = ZodValidationFactory.parseOrThrow(
      updateChallengeSchema,
      body,
      lang,
    );

    return await this.updateUseCase.execute(parsedBody);
  }

  @Post(":challengeId/interactions")
  @EndpointDoc({
    operation: {
      summary: "Creates a user interaction with an existing challenge",
    },
    response: {
      status: HttpStatus.CREATED,
      type: FullChallengeDto,
    },
    body: { type: NonExistingChallengeDto },
  })
  async createUserInteraction(
    @Param() params: ChallengeIdParamsDto,
    @Body() body: UserInteractChallengeBodyDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedBody } = ZodValidationFactory.parseOrThrow(
      userInteractChallengeSchema,
      body,
      lang,
    );
    const { data: parsedParams } = ZodValidationFactory.parseOrThrow(
      challengeIdParamsSchema,
      params,
      lang,
    );

    const result = await this.userInteractUseCase.execute({
      ...parsedBody,
      challengeId: parsedParams.challengeId,
    });

    if (!result) {
      throw new BadRequestException(t(lang).challenge.notFound);
    }

    return result;
  }
}
