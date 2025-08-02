import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import {
  NonExistentUserDto,
  UpdateUserRequestDto,
  FullUserResponseDto,
} from "@/modules/users/application/dtos/user.dto";
import { BaseUserRepository } from "../abstractions/user-repository.interface";
import { FULL_USER_INCLUDES } from "../constants/full-user-includes.constant";
import { PrismaFullUserAdapter } from "../adapters/user.adapter";

export const USER_REPOSITORY_TOKEN = Symbol("UserRepository");

@Injectable()
export class UserRepository implements BaseUserRepository {
  userAdapter: PrismaFullUserAdapter;

  constructor(private readonly db: PrismaService) {
    this.userAdapter = new PrismaFullUserAdapter();
  }

  async findById(userId: number): Promise<FullUserResponseDto | null> {
    const userFound = await this.db.user.findUnique({
      where: {
        id: userId,
      },
      include: FULL_USER_INCLUDES,
    });

    const adapted = userFound
      ? this.userAdapter.fromPrismaToFullUser(userFound)
      : null;

    return adapted;
  }

  async create(
    createUserDto: NonExistentUserDto,
  ): Promise<FullUserResponseDto> {
    const createdUser = await this.db.user.create({
      data: createUserDto,
      include: FULL_USER_INCLUDES,
    });

    const adapted = this.userAdapter.fromPrismaToFullUser(createdUser);

    return adapted;
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserRequestDto,
  ): Promise<FullUserResponseDto> {
    const updatedUser = await this.db.user.update({
      where: {
        id: userId,
      },
      data: updateUserDto,
      include: FULL_USER_INCLUDES,
    });

    const adapted = this.userAdapter.fromPrismaToFullUser(updatedUser);

    return adapted;
  }
}
