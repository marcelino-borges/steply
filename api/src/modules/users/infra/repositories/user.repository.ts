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

  async findByEmail(email: string): Promise<FullUserResponseDto | null> {
    const userFound = await this.db.user.findUnique({
      where: {
        email,
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
    const updatedUser = await this.db.user.update({
      where: {
        id: userId,
      },
      data: updateUserDto as any,
      include: FULL_USER_INCLUDES,
    });

    const adapted = this.userAdapter.fromPrismaToFullUser(updatedUser as any);

    return adapted;
  }

  async addActivities(userId: number, activityIds: number[]): Promise<void> {
    const existingActivities = await this.db.userInterestActivity.findMany({
      where: {
        userId,
        interestActivityId: {
          in: activityIds,
        },
      },
      select: {
        interestActivityId: true,
      },
    });

    const existingActivityIds = existingActivities.map(
      (activity) => activity.interestActivityId,
    );
    const newActivityIds = activityIds.filter(
      (id) => !existingActivityIds.includes(id),
    );

    if (newActivityIds.length > 0) {
      await this.db.userInterestActivity.createMany({
        data: newActivityIds.map((activityId) => ({
          userId,
          interestActivityId: activityId,
        })),
      });
    }
  }

  async removeActivities(userId: number, activityIds: number[]): Promise<void> {
    await this.db.userInterestActivity.deleteMany({
      where: {
        userId,
        interestActivityId: {
          in: activityIds,
        },
      },
    });
  }
}
