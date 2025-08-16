import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";

import { UserActivityController } from "./user-activity.controller";
import { FindUserActivitiesUseCase } from "@/modules/challenges/application/use-cases/activity/find-user-activities.use-case";
import { ActivityDto } from "@/modules/challenges/application/dtos/activity.dto";
import { Lang } from "@/core/application/locales";

describe("UserActivityController", () => {
  let controller: UserActivityController;
  let findUserActivitiesUseCase: FindUserActivitiesUseCase;

  const mockActivities: ActivityDto[] = [
    {
      id: 1,
      title: "Morning Run",
      description: "Daily morning run activity",
      startAt: new Date(2024, 0, 1),
      endAt: new Date(2024, 0, 31),
      challengeId: 1,
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
    {
      id: 2,
      title: "Evening Meditation",
      description: "20 minutes meditation session",
      startAt: new Date(2024, 0, 15),
      endAt: new Date(2024, 1, 15),
      challengeId: 2,
      createdAt: new Date(2024, 0, 15),
      updatedAt: new Date(2024, 0, 15),
    },
  ];

  const FindUserActivitiesUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserActivityController],
      providers: [
        {
          provide: FindUserActivitiesUseCase,
          useValue: FindUserActivitiesUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get(UserActivityController);
    findUserActivitiesUseCase = module.get(FindUserActivitiesUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("findUserActivities", () => {
    it("should call FindUserActivitiesUseCase.execute with parsed userId and return user activities", async () => {
      const userId = "123";
      const lang: Lang = "en";
      
      jest
        .spyOn(findUserActivitiesUseCase, "execute")
        .mockResolvedValue(mockActivities);

      const result = await controller.findUserActivities(userId, lang);

      expect(findUserActivitiesUseCase.execute).toHaveBeenCalledWith(123);
      expect(result).toStrictEqual(mockActivities);
    });

    it("should return empty array when user has no activities", async () => {
      const userId = "456";
      const lang: Lang = "en";
      
      jest
        .spyOn(findUserActivitiesUseCase, "execute")
        .mockResolvedValue([]);

      const result = await controller.findUserActivities(userId, lang);

      expect(findUserActivitiesUseCase.execute).toHaveBeenCalledWith(456);
      expect(result).toStrictEqual([]);
    });

    it("should use default language 'en' when lang header is not provided", async () => {
      const userId = "789";
      
      jest
        .spyOn(findUserActivitiesUseCase, "execute")
        .mockResolvedValue(mockActivities);

      const result = await controller.findUserActivities(userId, undefined);

      expect(findUserActivitiesUseCase.execute).toHaveBeenCalledWith(789);
      expect(result).toStrictEqual(mockActivities);
    });

    it("should throw BadRequestException when userId is not a valid integer", async () => {
      const invalidUserId = "abc";
      const lang: Lang = "en";

      await expect(
        controller.findUserActivities(invalidUserId, lang)
      ).rejects.toThrow(BadRequestException);

      expect(findUserActivitiesUseCase.execute).not.toHaveBeenCalled();
    });

    it("should throw BadRequestException when userId is a decimal number", async () => {
      const invalidUserId = "123.45";
      const lang: Lang = "en";

      await expect(
        controller.findUserActivities(invalidUserId, lang)
      ).rejects.toThrow(BadRequestException);

      expect(findUserActivitiesUseCase.execute).not.toHaveBeenCalled();
    });

    it("should handle empty string userId as 0", async () => {
      const invalidUserId = "";
      const lang: Lang = "en";
      
      jest
        .spyOn(findUserActivitiesUseCase, "execute")
        .mockResolvedValue([]);

      const result = await controller.findUserActivities(invalidUserId, lang);

      expect(findUserActivitiesUseCase.execute).toHaveBeenCalledWith(0);
      expect(result).toStrictEqual([]);
    });

    it("should throw BadRequestException when userId contains special characters", async () => {
      const invalidUserId = "123@#";
      const lang: Lang = "en";

      await expect(
        controller.findUserActivities(invalidUserId, lang)
      ).rejects.toThrow(BadRequestException);

      expect(findUserActivitiesUseCase.execute).not.toHaveBeenCalled();
    });

    it("should handle negative integer userId values", async () => {
      const userId = "-10";
      const lang: Lang = "en";
      
      jest
        .spyOn(findUserActivitiesUseCase, "execute")
        .mockResolvedValue([]);

      const result = await controller.findUserActivities(userId, lang);

      expect(findUserActivitiesUseCase.execute).toHaveBeenCalledWith(-10);
      expect(result).toStrictEqual([]);
    });

    it("should handle very large integer userId values", async () => {
      const userId = "999999999";
      const lang: Lang = "en";
      
      jest
        .spyOn(findUserActivitiesUseCase, "execute")
        .mockResolvedValue(mockActivities);

      const result = await controller.findUserActivities(userId, lang);

      expect(findUserActivitiesUseCase.execute).toHaveBeenCalledWith(999999999);
      expect(result).toStrictEqual(mockActivities);
    });

    it("should handle pt language", async () => {
      const userId = "100";
      const lang: Lang = "pt";
      
      jest
        .spyOn(findUserActivitiesUseCase, "execute")
        .mockResolvedValue(mockActivities);

      const result = await controller.findUserActivities(userId, lang);

      expect(findUserActivitiesUseCase.execute).toHaveBeenCalledWith(100);
      expect(result).toStrictEqual(mockActivities);
    });

    it("should propagate errors from use case", async () => {
      const userId = "200";
      const lang: Lang = "en";
      const error = new Error("Database connection failed");
      
      jest
        .spyOn(findUserActivitiesUseCase, "execute")
        .mockRejectedValue(error);

      await expect(
        controller.findUserActivities(userId, lang)
      ).rejects.toThrow(error);

      expect(findUserActivitiesUseCase.execute).toHaveBeenCalledWith(200);
    });
  });
});