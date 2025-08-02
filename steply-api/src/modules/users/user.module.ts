import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/core/infra/services/database.module";
import { UserController } from "@/modules/users/infra/controllers/user.controller";
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from "@/modules/users/infra/repositories/user.repository";
import { CreateUserUseCase } from "@/modules/users/application/use-cases/create-user.use-case";
import { FindUserByIdUseCase } from "@/modules/users/application/use-cases/find-by-id.use-case";
import { UpdateUserUseCase } from "@/modules/users/application/use-cases/update-user.use-case";
import { JoinChallengeUseCase } from "@/modules/users/application/use-cases/join-challenge.use-case";
import {
  USER_CHALLENGE_REPOSITORY_TOKEN,
  UserChallengeRepository,
} from "./infra/repositories/user-challenge.repository";
import { FindAllUserChallengesUseCase } from "./application/use-cases/find-all-challenges.use-case";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: USER_CHALLENGE_REPOSITORY_TOKEN,
      useClass: UserChallengeRepository,
    },

    CreateUserUseCase,
    FindAllUserChallengesUseCase,
    FindUserByIdUseCase,
    JoinChallengeUseCase,
    UpdateUserUseCase,
  ],
})
export class UserModule {}
