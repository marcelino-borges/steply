import {
  Controller,
  Get,
  Post,
  Patch,
  HttpStatus,
  BadRequestException,
  Param,
  Headers,
  Body,
} from "@nestjs/common";

import {
  createUserBodySchema,
  updateUserSchema,
  userIdParamsSchema,
} from "@/core/application/schemas/user.schema";
import { ZodValidationFactory } from "@/core/infra/factories/zod-validation.factory";
import { joinChallengeSchema } from "@/core/application/schemas/user-challenge.schema";
import { Lang, t } from "@/core/application/locales";
import { EndpointDoc } from "@/core/infra/decorators/swagger-endpoint-doc.decorator";
import { challengeIdParamsSchema } from "@/core/application/schemas/challenge.schema";
import {
  UpdateUserRequestDto,
  UserIdParamsDto,
  FullUserResponseDto,
  NonExistentUserDto,
} from "@/modules/users/application/dtos/user.dto";
import { CreateUserUseCase } from "@/modules/users/application/use-cases/create-user.use-case";
import { FindUserByIdUseCase } from "@/modules/users/application/use-cases/find-by-id.use-case";
import { UpdateUserUseCase } from "@/modules/users/application/use-cases/update-user.use-case";
import { JoinChallengeUseCase } from "@/modules/users/application/use-cases/join-challenge.use-case";
import {
  JoinChallengeDto,
  UserChallengeResponseDto,
} from "@/modules/users/application/dtos/user-challenge.dto";
import { ChallengeIdParamsDto } from "@/modules/challenges/application/dtos/challenge.dto";

@Controller("users")
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly joinChallengeUseCase: JoinChallengeUseCase,
  ) {}

  @Get(":userId")
  @EndpointDoc({
    operation: {
      summary: "Get an user by ID",
    },
    response: {
      status: HttpStatus.OK,
      type: FullUserResponseDto,
    },
  })
  async findById(
    @Param() params: UserIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedParams } = ZodValidationFactory.parseOrThrow(
      userIdParamsSchema,
      params,
      lang,
    );

    const userFound = await this.findUserByIdUseCase.execute(
      parsedParams.userId,
    );

    if (!userFound) {
      throw new BadRequestException(t(lang as Lang).user.notFound);
    }

    return userFound;
  }

  @Post()
  @EndpointDoc({
    operation: {
      summary: "Create a new user",
    },
    response: {
      status: HttpStatus.CREATED,
      type: FullUserResponseDto,
    },
  })
  async create(
    @Body() body: NonExistentUserDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedBody } = ZodValidationFactory.parseOrThrow(
      createUserBodySchema,
      body,
      lang,
    );

    return await this.createUserUseCase.execute(parsedBody);
  }

  @Patch(":userId")
  @EndpointDoc({
    operation: {
      summary: "Update an existing user",
    },
    response: {
      status: HttpStatus.OK,
      type: FullUserResponseDto,
    },
  })
  async update(
    @Body() body: UpdateUserRequestDto,
    @Param() params: UserIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedBody } = ZodValidationFactory.parseOrThrow(
      updateUserSchema,
      body,
      lang,
    );
    const { data: parsedParams } = ZodValidationFactory.parseOrThrow(
      userIdParamsSchema,
      params,
      lang,
    );

    return await this.updateUserUseCase.execute(
      parsedParams.userId,
      parsedBody,
    );
  }

  @Post("/challenges/:challengeId")
  @EndpointDoc({
    operation: {
      summary: "Makes the user to join a challenge",
    },
    response: {
      status: HttpStatus.NO_CONTENT,
      type: UserChallengeResponseDto,
    },
  })
  async joinChallenge(
    @Body() body: JoinChallengeDto,
    @Param() params: ChallengeIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data: parsedBody } = ZodValidationFactory.parseOrThrow(
      joinChallengeSchema,
      body,
      lang,
    );
    const { data: parsedParams } = ZodValidationFactory.parseOrThrow(
      challengeIdParamsSchema,
      params,
      lang,
    );

    return await this.joinChallengeUseCase.execute(
      parsedBody,
      parsedParams.challengeId,
    );
  }
}
