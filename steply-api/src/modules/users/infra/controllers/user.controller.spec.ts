import { BadRequestException } from "@nestjs/common";
import { t } from "@/core/application/locales";
import { UserController } from "./user.controller";
import { CreateUserUseCase } from "../../application/use-cases/create-user.use-case";
import { UpdateUserUseCase } from "../../application/use-cases/update-user.use-case";
import { FindUserByIdUseCase } from "../../application/use-cases/find-by-id.use-case";
import { JoinChallengeUseCase } from "../../application/use-cases/join-challenge.use-case";
import { Test, TestingModule } from "@nestjs/testing";
import {
  EXISTING_FULL_USER,
  EXISTING_USER,
  NON_EXISTING_USER,
} from "../../__mocks__/user.mock";
import { EXISTING_USER_CHALLENGE } from "../../__mocks__/user-challenges.mock";

describe("UserController", () => {
  let controller: UserController;

  let createUseCase: CreateUserUseCase;
  let updateUseCase: UpdateUserUseCase;
  let findByIdUseCase: FindUserByIdUseCase;
  let joinMethodUseCase: JoinChallengeUseCase;

  const CreateUserUseCaseMock = {
    execute: jest.fn(),
  };

  const UpdateUserUseCaseMock = {
    execute: jest.fn(),
  };

  const FindUserByIdUseCaseMock = {
    execute: jest.fn(),
  };

  const JoinChallengeUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: CreateUserUseCaseMock,
        },
        {
          provide: UpdateUserUseCase,
          useValue: UpdateUserUseCaseMock,
        },
        {
          provide: FindUserByIdUseCase,
          useValue: FindUserByIdUseCaseMock,
        },
        {
          provide: JoinChallengeUseCase,
          useValue: JoinChallengeUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get(UserController);
    createUseCase = module.get(CreateUserUseCase);
    updateUseCase = module.get(UpdateUserUseCase);
    findByIdUseCase = module.get(FindUserByIdUseCase);
    joinMethodUseCase = module.get(JoinChallengeUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const userId = 1;

  describe("findById", () => {
    it("should call the execute method from FindUserByIdUseCase instance and return the organization found", async () => {
      jest
        .spyOn(findByIdUseCase, "execute")
        .mockResolvedValue(EXISTING_FULL_USER);
      const orgFound = await controller.findById({ userId });

      expect(findByIdUseCase.execute).toHaveBeenCalledWith(userId);
      expect(orgFound).toStrictEqual(EXISTING_FULL_USER);
    });

    it("should throw a BadRequestException when no user is found by the FindUserByIdUseCase", async () => {
      jest.spyOn(findByIdUseCase, "execute").mockResolvedValue(null);
      const expectedErrorMsg = t("en").user.notFound;

      try {
        await controller.findById({ userId });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(expectedErrorMsg);
      }
    });

    it("should throw a BadRequestException if the userId passed in params has not a valid type", async () => {
      try {
        await controller.findById({
          userId: "A",
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "userId: Invalid field",
        );
      }
    });
  });

  describe("create", () => {
    it("should call the execute method from CreateUserUseCase instance and return the user created", async () => {
      jest.spyOn(createUseCase, "execute").mockResolvedValue(EXISTING_USER);

      const result = await controller.create(NON_EXISTING_USER);

      expect(createUseCase.execute).toHaveBeenCalledWith({
        ...NON_EXISTING_USER,
        street: NON_EXISTING_USER.street || "-",
        city: NON_EXISTING_USER.city || "-",
        state: NON_EXISTING_USER.state || "-",
        neighborhood: NON_EXISTING_USER.neighborhood || "-",
        addressNumber: NON_EXISTING_USER.addressNumber || "-",
        postalCode: NON_EXISTING_USER.postalCode || "-",
      });
      expect(result).toStrictEqual(EXISTING_USER);
    });

    it("should throw a BadRequestException if the body is not as expected for an user being created", async () => {
      try {
        await controller.create({
          ...NON_EXISTING_USER,
          email: 123,
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "email: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the body doesn't contain some of the required props", async () => {
      try {
        await controller.create({
          countryId: 1,
          name: "John Doe",
          organizationId: null,
          bio: "bio",
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "email: Required field; phone: Required field; acceptsCommunication: Required field",
        );
      }
    });
  });

  describe("update", () => {
    it("should call the execute method from UpdateUserUseCase instance and return the user updated", async () => {
      jest
        .spyOn(updateUseCase, "execute")
        .mockResolvedValue(EXISTING_FULL_USER);

      const result = await controller.update(EXISTING_USER, {
        userId: EXISTING_USER.id,
      });

      expect(updateUseCase.execute).toHaveBeenCalledWith(EXISTING_USER.id, {
        ...EXISTING_USER,
        createdAt: undefined,
        updatedAt: undefined,
        street: EXISTING_USER.street || "-",
        city: EXISTING_USER.city || "-",
        state: EXISTING_USER.state || "-",
        neighborhood: EXISTING_USER.neighborhood || "-",
        addressNumber: EXISTING_USER.addressNumber || "-",
        postalCode: EXISTING_USER.postalCode || "-",
      });
      expect(result).toStrictEqual(EXISTING_FULL_USER);
    });

    it("should throw a BadRequestException if the body is not as expected for an org being updated", async () => {
      try {
        await controller.update(
          {
            ...EXISTING_USER,
            email: 123,
          } as any,
          { userId: EXISTING_USER.id },
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "email: Invalid field",
        );
      }
    });

    describe("joinChallenge", () => {
      const challengeId = 1;

      it("should call the execute method from JoinChallengeUseCase instance and return an object representing the challenge related to that user", async () => {
        jest
          .spyOn(joinMethodUseCase, "execute")
          .mockResolvedValue(EXISTING_USER_CHALLENGE);

        const result = await controller.joinChallenge(
          { userId },
          { challengeId },
        );

        expect(joinMethodUseCase.execute).toHaveBeenCalledWith(
          { userId },
          challengeId,
        );
        expect(result).toStrictEqual(EXISTING_USER_CHALLENGE);
      });

      it("should throw a BadRequestException if the body is not as expected for a user to join a challenge", async () => {
        try {
          await controller.joinChallenge(
            {
              unexpected: 1,
            } as any,
            { challengeId },
          );
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect((error as BadRequestException).message).toMatch(
            /userId: Invalid field/i,
          );
        }
      });
    });
  });
});
