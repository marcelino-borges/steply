import { JoinMethod as ORMJoinMethod } from "prisma/client";
import { PrismaFullUser } from "../dtos/user.dto";
import { PrismaFullUserAdapter } from "./user.adapter";
import { FullUserResponseDto } from "../../application/dtos/user.dto";
import { PrismaUserChallengeAdapter } from "./user-challenge.adapter";
import { GeneralInterestDto } from "../../application/dtos/general-interest.dto";
import { ActivityInterestDto } from "../../application/dtos/activity-interest.dto";
import { UserBadgeDto } from "../../application/dtos/badge.dto";
import { UserChallengeResponseDto } from "../../application/dtos/user-challenge.dto";

describe("PrismaFullUserAdapter", () => {
  const adapter = new PrismaFullUserAdapter();
  const prismaUser: PrismaFullUser = {
    id: 1,
    name: "John Doe",
    addressNumber: "num",
    bio: "Bio",
    city: "SP",
    country: {
      id: 1,
      abbreviation: "BR",
      name: "Brazil",
      phoneCode: 55,
    },
    email: "john.doe@example.com",
    phone: "+1234567890",
    countryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    neighborhood: "Jardins",
    organization: {
      id: 1,
      name: "Example Organization",
    },
    organizationId: 1,
    pictureUrl: "http://pic.url",
    postalCode: "1111111",
    state: "SP",
    street: "Street name",
    acceptsCommunication: true,
    wantsAccountPersonalization: false,
    genderId: null,
    goalId: null,
    mainGoalLevelId: null,
    nextRegistrationStep: 0,
    activityInterests: [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        interestActivity: {
          name: "Act name",
        },
        interestActivityId: 1,
        userId: 1,
      },
    ],
    badges: [
      {
        badgeId: 1,
        badge: {
          id: 1,
          name: "Badge name",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
    ],
    generalInterests: [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        interestGeneral: { name: "General interest name" },
        interestGeneralId: 1,
        userId: 1,
      },
    ],
    ownedOrganization: {
      id: 1,
      name: "Example Organization",
    },
    userChallenges: [
      {
        challenge: {
          id: 1,
          title: "Title",
          bannerUrl: "http://banner.url",
          createdAt: new Date(),
          updatedAt: new Date(),
          description: "desc",
          endAt: new Date(),
          startAt: new Date(),
          interactionIncrement: 1,
          isPublic: true,
          joinMethod: ORMJoinMethod.APPROVAL,
          organizationId: 1,
          ownerUserId: null,
          tags: ["test", "user-adapter"] as string[],
          checkInEndOfDay: false,
          multipleCheckIns: false,
          checkInTypeCode: 1,
          reward: {
            challengeId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            deliveryDetails: "Details",
            description: "desc",
            id: 1,
            name: "Name",
            rewardTypeId: 1,
            imageUrl: "http://image.com",
            filesUrls: ["http://file1.com"],
          },
        },
        challengeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        checkInsCount: 100,
        checkIns: [
          {
            createdAt: new Date(),
            updatedAt: new Date(),
            challengeId: 1,
            id: 1,
            imageUrl: "http://image.url",
            location: "Loca",
            text: "Text",
            userId: 1,
            videoUrl: "http://video.url",
          },
        ],
      },
    ],
  };

  const userChallengeAdapter = new PrismaUserChallengeAdapter();

  describe("fromPrismaToFullUser", () => {
    const expectedResult: FullUserResponseDto = {
      id: prismaUser.id,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      countryId: prismaUser.countryId,
      name: prismaUser.name,
      email: prismaUser.email,
      phone: prismaUser.phone,
      street: prismaUser.street,
      city: prismaUser.city,
      state: prismaUser.state,
      addressNumber: prismaUser.addressNumber,
      neighborhood: prismaUser.neighborhood,
      postalCode: prismaUser.postalCode,
      organizationId: prismaUser.organizationId,
      pictureUrl: prismaUser.pictureUrl,
      bio: prismaUser.bio,
      acceptsCommunication: prismaUser.acceptsCommunication,
      wantsAccountPersonalization: prismaUser.wantsAccountPersonalization,
      genderId: prismaUser.genderId,
      goalId: prismaUser.goalId,
      mainGoalLevelId: prismaUser.mainGoalLevelId,
      nextRegistrationStep: prismaUser.nextRegistrationStep,
      activityInterests: prismaUser.activityInterests.map(
        (int) =>
          ({
            createdAt: int.createdAt,
            updatedAt: int.updatedAt,
            name: int.interestActivity.name,
          }) as ActivityInterestDto,
      ),
      generalInterests: prismaUser.generalInterests.map(
        (int) =>
          ({
            createdAt: int.createdAt,
            updatedAt: int.updatedAt,
            name: int.interestGeneral.name,
            lang: undefined,
          }) as GeneralInterestDto,
      ),
      badges: prismaUser.badges.map(
        (userBadge) =>
          ({
            id: userBadge.badge.id,
            createdAt: userBadge.createdAt,
            updatedAt: userBadge.updatedAt,
            name: userBadge.badge.name,
          }) as UserBadgeDto,
      ),
      country: prismaUser.country,
      organization: prismaUser.organization,
      ownedOrganization: prismaUser.ownedOrganization,
      userChallenges: prismaUser.userChallenges.map(
        (ch) =>
          userChallengeAdapter.fromPrismaToUserChallengeResponse(
            ch,
          ) as UserChallengeResponseDto,
      ),
    };

    it("should return an object of type FullUserResponseDto from the inputted PrismaFullUser", () => {
      const result = adapter.fromPrismaToFullUser(prismaUser);

      expect(result).toEqual(expectedResult);
    });
  });
});
