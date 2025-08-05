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
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        phone: createUserDto.phone,
        street: createUserDto.street ?? null,
        city: createUserDto.city ?? null,
        state: createUserDto.state ?? null,
        neighborhood: createUserDto.neighborhood ?? null,
        addressNumber: createUserDto.addressNumber ?? null,
        postalCode: createUserDto.postalCode ?? null,
        pictureUrl: createUserDto.pictureUrl ?? null,
        bio: createUserDto.bio ?? null,
        acceptsCommunication: createUserDto.acceptsCommunication,
        wantsAccountPersonalization:
          createUserDto.wantsAccountPersonalization ?? false,
        genderId: createUserDto.genderId ?? null,
        goalId: createUserDto.goalId ?? null,
        mainGoalLevelId: createUserDto.mainGoalLevelId ?? null,
        nextRegistrationStep: createUserDto.nextRegistrationStep ?? 0,
        organizationId: createUserDto.organizationId,
        countryId: createUserDto.countryId,
      },
      include: FULL_USER_INCLUDES,
    });

    const adapted = this.userAdapter.fromPrismaToFullUser(createdUser);

    return adapted;
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserRequestDto,
  ): Promise<FullUserResponseDto> {
    const { id, ...dataToUpdate } = updateUserDto;
    const updatedUser = await this.db.user.update({
      where: {
        id: userId,
      },
      data: dataToUpdate as any,
      include: FULL_USER_INCLUDES,
    });

    const adapted = this.userAdapter.fromPrismaToFullUser(updatedUser as any);

    return adapted;
  }
}
