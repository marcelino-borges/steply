import { UserRepository } from "@/modules/users/infra/repositories/user.repository";
import { FullUserResponseDto } from "@/modules/users/application/dtos/user.dto";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import { FULL_USER_INCLUDES } from "../constants/full-user-includes.constant";

jest.mock("@prisma/client");

describe("UsersRepository", () => {
  let prismaService: PrismaService;
  let userRepository: UserRepository;
  const userId = 123;
  const userToCreate = {
    countryId: 1,
    name: "John Doe",
    email: "email@email.com",
    phone: "+1234567890",
    street: "Jhon st.",
    city: "Cacua",
    state: "Pyron",
    addressNumber: "123A",
    neighborhood: "Gatuno",
    postalCode: "1234567",
    bio: "My pretty bio",
    organizationId: null,
    acceptsCommunication: true,
    wantsAccountPersonalization: false,
    genderId: null,
    goalId: null,
    mainGoalLevelId: null,
    nextRegistrationStep: 0,
  };
  const userResponse: FullUserResponseDto = {
    ...userToCreate,
    id: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
    organization: undefined,
    ownedOrganization: undefined,
    pictureUrl: null,
    userChallenges: [],
    activityInterests: [],
    generalInterests: [],
    badges: [],
    acceptsCommunication: true,
    country: {
      id: 1,
      abbreviation: "BR",
      name: "Brazil",
      phoneCode: 55,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    prismaService = module.get(PrismaService);
    userRepository = module.get(UserRepository);
  });

  describe("findById", () => {
    it("should call the user database function 'findUnique' to get the user by id", async () => {
      const findUniqueSpy = jest.spyOn(prismaService.user, "findUnique");

      await userRepository.findById(userId);

      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        include: FULL_USER_INCLUDES,
      });
    });

    it("should return the user found on database", async () => {
      jest
        .spyOn(prismaService.user, "findUnique")
        .mockResolvedValue(userResponse as any);

      const result = await userRepository.findById(1);

      expect(result).toEqual(userResponse);
    });
  });

  describe("create", () => {
    it("should call the user database function to create an user and return it", async () => {
      const createSpy = jest
        .spyOn(prismaService.user, "create")
        .mockResolvedValue(userResponse as any);

      const result = await userRepository.create(userToCreate);

      expect(createSpy).toHaveBeenCalledWith({
        data: userToCreate,
        include: FULL_USER_INCLUDES,
      });
      expect(result).toEqual(userResponse);
    });
  });

  describe("update", () => {
    it("should call the user database function to update an user", async () => {
      const payload = {
        ...userResponse,
        organizationId: null,
      };
      const updateSpy = jest
        .spyOn(prismaService.user, "update")
        .mockResolvedValue(payload as any);

      await userRepository.update(userId, payload);

      const { id, ...expectedData } = payload;
      expect(updateSpy).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        data: expectedData,
        include: FULL_USER_INCLUDES,
      });
    });

    it("should return the user updated on database", async () => {
      jest.spyOn(prismaService.user, "update").mockResolvedValue(userResponse as any);

      const result = await userRepository.update(userId, {
        ...userResponse,
        organizationId: null,
      });

      expect(result).toEqual(userResponse);
    });
  });
});
