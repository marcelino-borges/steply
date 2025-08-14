import { ActivityInterestDto } from "../../application/dtos/activity-interest.dto";
import { UserBadgeDto } from "../../application/dtos/badge.dto";
import { GeneralInterestDto } from "../../application/dtos/general-interest.dto";
import { FullUserResponseDto } from "../../application/dtos/user.dto";
import { PrismaFullUser } from "../dtos/user.dto";
import { PrismaUserChallengeAdapter } from "./user-challenge.adapter";

export class PrismaFullUserAdapter {
  fromPrismaToFullUser(prismaUser: PrismaFullUser): FullUserResponseDto {
    const fullUser = new FullUserResponseDto();

    fullUser.id = prismaUser.id;
    fullUser.name = prismaUser.name;
    fullUser.email = prismaUser.email;
    fullUser.phone = prismaUser.phone;
    fullUser.bio = prismaUser.bio;
    fullUser.street = prismaUser.street;
    fullUser.city = prismaUser.city;
    fullUser.neighborhood = prismaUser.neighborhood;
    fullUser.addressNumber = prismaUser.addressNumber;
    fullUser.country = prismaUser.country;
    fullUser.state = prismaUser.state;
    fullUser.countryId = prismaUser.countryId;
    fullUser.postalCode = prismaUser.postalCode;
    fullUser.pictureUrl = prismaUser.pictureUrl;
    fullUser.createdAt = prismaUser.createdAt;
    fullUser.updatedAt = prismaUser.updatedAt;
    fullUser.organization = prismaUser.organization;
    fullUser.organizationId = prismaUser.organizationId;
    fullUser.ownedOrganization = prismaUser.ownedOrganization;
    fullUser.acceptsCommunication = prismaUser.acceptsCommunication;
    fullUser.wantsAccountPersonalization =
      prismaUser.wantsAccountPersonalization;
    fullUser.genderId = prismaUser.genderId;
    fullUser.goalId = prismaUser.goalId;
    fullUser.mainGoalLevelId = prismaUser.mainGoalLevelId;
    fullUser.nextRegistrationStep = prismaUser.nextRegistrationStep;
    fullUser.generalInterests = [];
    fullUser.activityInterests = [];
    fullUser.userChallenges = [];
    fullUser.badges = [];

    if (prismaUser.generalInterests) {
      for (const interest of prismaUser.generalInterests) {
        const adaptedGeneralInterest = new GeneralInterestDto();

        adaptedGeneralInterest.createdAt = interest.createdAt;
        adaptedGeneralInterest.updatedAt = interest.updatedAt;
        adaptedGeneralInterest.name = interest.interestGeneral.name;
        adaptedGeneralInterest.id = interest.interestGeneral.id;

        fullUser.generalInterests.push(adaptedGeneralInterest);
      }
    }

    if (prismaUser.activityInterests) {
      for (const interest of prismaUser.activityInterests) {
        const adaptedActivityInterest = new ActivityInterestDto();

        adaptedActivityInterest.createdAt = interest.createdAt;
        adaptedActivityInterest.updatedAt = interest.updatedAt;
        adaptedActivityInterest.name = interest.interestActivity.name;
        adaptedActivityInterest.id = interest.interestActivity.id;

        fullUser.activityInterests.push(adaptedActivityInterest);
      }
    }

    const userChallengeAdapter = new PrismaUserChallengeAdapter();

    if (prismaUser.userChallenges) {
      for (const userChallenge of prismaUser.userChallenges) {
        const adaptedChallenge =
          userChallengeAdapter.fromPrismaToUserChallengeResponse(userChallenge);
        fullUser.userChallenges.push(adaptedChallenge);
      }
    }

    if (prismaUser.badges) {
      for (const userBadge of prismaUser.badges) {
        const adaptedBadge = new UserBadgeDto();

        adaptedBadge.createdAt = userBadge.createdAt;
        adaptedBadge.updatedAt = userBadge.updatedAt;
        adaptedBadge.name = userBadge.badge.name;
        adaptedBadge.id = userBadge.badge.id;

        fullUser.badges.push(adaptedBadge);
      }
    }

    return fullUser;
  }
}
