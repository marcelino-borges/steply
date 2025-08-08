import { Test, TestingModule } from "@nestjs/testing";

import { BadRequestException } from "@nestjs/common";
import { t } from "@/core/application/locales";
import { ActivityController } from "./activity.controller";
import { CreateActivityUseCase } from "@/modules/challenges/application/use-cases/activity/create-activity.use-case";
import { UpdateActivityUseCase } from "@/modules/challenges/application/use-cases/activity/update-activity.use-case";
import { FindActivityByIdUseCase } from "@/modules/challenges/application/use-cases/activity/find-activity-by-id.use-case";
import { QueryActivitiesUseCase } from "@/modules/challenges/application/use-cases/activity/query-activities.use-case";
import { DeleteActivityUseCase } from "@/modules/challenges/application/use-cases/activity/delete-activity.use-case";
import {
  EXISTING_ACTIVITY,
  NON_EXISTING_ACTIVITY,
} from "@/modules/challenges/__mocks__/activity.mock";
import { PaginatedItems } from "@/core/application/dtos/paginated-result.dto";

describe("ActivityController", () => {
  let controller: ActivityController;

  let createUseCase: CreateActivityUseCase;
  let updateUseCase: UpdateActivityUseCase;
  let findByIdUseCase: FindActivityByIdUseCase;
  let queryUseCase: QueryActivitiesUseCase;
  let deleteUseCase: DeleteActivityUseCase;

  const CreateUseCaseMock = {
    execute: jest.fn(),
  };

  const UpdateUseCaseMock = {
    execute: jest.fn(),
  };

  const FindByIdUseCaseMock = {
    execute: jest.fn(),
  };

  const QueryActivitiesUseCaseMock = {
    execute: jest.fn(),
  };

  const DeleteActivityUseCaseUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [
        {
          provide: CreateActivityUseCase,
          useValue: CreateUseCaseMock,
        },
        {
          provide: UpdateActivityUseCase,
          useValue: UpdateUseCaseMock,
        },
        {
          provide: FindActivityByIdUseCase,
          useValue: FindByIdUseCaseMock,
        },
        {
          provide: QueryActivitiesUseCase,
          useValue: QueryActivitiesUseCaseMock,
        },
        {
          provide: DeleteActivityUseCase,
          useValue: DeleteActivityUseCaseUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get(ActivityController);

    createUseCase = module.get(CreateActivityUseCase);
    findByIdUseCase = module.get(FindActivityByIdUseCase);
    updateUseCase = module.get(UpdateActivityUseCase);
    queryUseCase = module.get(QueryActivitiesUseCase);
    deleteUseCase = module.get(DeleteActivityUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const challengeId = 2;
  const activityId = 1;

  describe("findById", () => {
    const inputMock = { activityId, challengeId };

    it("should call the execute method from FindActivityByIdUseCase instance and return the activity found", async () => {
      jest
        .spyOn(findByIdUseCase, "execute")
        .mockResolvedValue(EXISTING_ACTIVITY);
      const activityFound = await controller.findById(inputMock);

      expect(findByIdUseCase.execute).toHaveBeenCalledWith(
        activityId,
        challengeId,
      );
      expect(activityFound).toStrictEqual(EXISTING_ACTIVITY);
    });

    it("should throw a BadRequestException when no activity is found by the FindActivityByIdUseCase", async () => {
      jest.spyOn(findByIdUseCase, "execute").mockResolvedValue(null);
      const expectedErrorMsg = t("en").activity.notFound;

      try {
        await controller.findById(inputMock);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(expectedErrorMsg);
      }
    });

    it("should throw a BadRequestException if the activityId or challengeId passed in params has not a valid type", async () => {
      try {
        await controller.findById({
          activityId: "A1",
          challengeId: "@x2",
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "activityId: Invalid field; ",
        );
        expect((error as BadRequestException).message).toMatch(
          "challengeId: Invalid field",
        );
      }
    });
  });

  describe("query", () => {
    const search = {
      searchActivity: "act",
      searchChallenge: "cha",
      startAt: new Date(2010, 5, 22),
      endAt: new Date(2010, 10, 13),
      pageNumber: 3,
      pageSize: 31,
    };

    const paginatedResult = new PaginatedItems(
      [EXISTING_ACTIVITY],
      1,
      search.pageNumber,
      search.pageSize,
    );

    it("should call the execute method from FindActivityByIdUseCase instance and return the activity found", async () => {
      jest.spyOn(queryUseCase, "execute").mockResolvedValue(paginatedResult);

      const result = await controller.query(search, "en", String(challengeId));

      expect(queryUseCase.execute).toHaveBeenCalledWith(challengeId, search);
      expect(result).toStrictEqual(paginatedResult);
    });

    it("should throw a BadRequestException if the activityId or challengeId passed in params has not a valid type", async () => {
      try {
        await controller.query(
          {
            ...search,
            searchActivity: 1,
          } as any,
          "en",
          String(challengeId),
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "searchActivity: Invalid field",
        );
      }
    });
  });

  describe("create", () => {
    it("should call the execute method from FindActivityByIdUseCase instance and return the activity created", async () => {
      jest.spyOn(createUseCase, "execute").mockResolvedValue(EXISTING_ACTIVITY);

      const result = await controller.create(NON_EXISTING_ACTIVITY, {
        challengeId,
      });

      expect(createUseCase.execute).toHaveBeenCalledWith(
        NON_EXISTING_ACTIVITY,
        challengeId,
      );
      expect(result).toStrictEqual(EXISTING_ACTIVITY);
    });

    it("should throw a BadRequestException if the body passed has unexpected data types", async () => {
      try {
        await controller.create(
          {
            ...EXISTING_ACTIVITY,
            title: 1,
          } as any,
          { challengeId },
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "title: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the challengeId sent in params has an invalid type", async () => {
      try {
        await controller.create(
          {
            title: "Tit",
            description: "Desc",
            startAt: new Date(2005, 5, 22),
            endAt: new Date(2005, 6, 22),
          },
          { challengeId: true } as any,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "challengeId: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the challengeId is not found in params", async () => {
      try {
        await controller.create(
          {
            title: "Tit",
            description: "Desc",
            startAt: new Date(2005, 5, 22),
            endAt: new Date(2005, 6, 22),
          },
          {} as any,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "challengeId: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the body is sent missing some required prop", async () => {
      try {
        await controller.create(
          {
            description: "Desc",
            startAt: new Date(2005, 5, 22),
            endAt: new Date(2005, 6, 22),
          } as any,
          { challengeId: true } as any,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "title: Required field",
        );
      }
    });

    it("should throw a BadRequestException if the body is sent with some prop of an invalid type", async () => {
      try {
        await controller.create(
          {
            title: "Adeq",
            description: "Desc",
            startAt: true,
            endAt: new Date(2005, 6, 22),
          } as any,
          { challengeId } as any,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          /title: Invalid field/i,
        );
        expect((error as BadRequestException).message).toMatch(
          /startAt: Invalid field/i,
        );
      }
    });
  });

  describe("update", () => {
    it("should call the execute method from UpdateActivityUseCase instance and return the activity updated", async () => {
      jest.spyOn(updateUseCase, "execute").mockResolvedValue(EXISTING_ACTIVITY);

      const result = await controller.update(EXISTING_ACTIVITY, {
        challengeId,
      });

      expect(updateUseCase.execute).toHaveBeenCalledWith({
        ...EXISTING_ACTIVITY,
        challengeId,
        createdAt: undefined,
        updatedAt: undefined,
      });
      expect(result).toStrictEqual(EXISTING_ACTIVITY);
    });

    it("should throw a BadRequestException if the body passed has unexpected data types", async () => {
      try {
        await controller.update(
          {
            ...EXISTING_ACTIVITY,
            title: 1,
          } as any,
          { challengeId },
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "title: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the challengeId sent in params has an invalid type", async () => {
      try {
        await controller.update(EXISTING_ACTIVITY, {
          challengeId: true,
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "challengeId: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the challengeId is not found in params", async () => {
      try {
        await controller.update(EXISTING_ACTIVITY, {} as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "challengeId: Invalid field",
        );
      }
    });

    it("should throw a BadRequestException if the body is sent missing some required prop", async () => {
      try {
        await controller.update(
          {
            id: 2,
            createdAt: new Date(2005, 5, 22),
            updatedAt: new Date(2005, 5, 22),
            challengeId: 2,
            description: "Desc",
            startAt: new Date(2005, 5, 22),
            endAt: new Date(2005, 6, 22),
          } as any,
          { challengeId: true } as any,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(
          "title: Required field",
        );
      }
    });

    it("should throw a BadRequestException if the body is sent with some prop of an invalid type", async () => {
      try {
        await controller.update(
          {
            id: 2,
            createdAt: new Date(2005, 5, 22),
            updatedAt: new Date(2005, 5, 22),
            challengeId: 2,
            description: 1233,
            title: "Title",
            startAt: "Optuy",
            endAt: new Date(2005, 6, 22),
          } as any,
          { challengeId } as any,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          /description: Invalid field/i,
        );
        expect((error as BadRequestException).message).toMatch(
          /startAt: Invalid date/i,
        );
      }
    });
  });

  describe("delete", () => {
    const inputMock = { activityId, challengeId };

    it("should call the execute method from DeleteActivityUseCase instance", async () => {
      jest.spyOn(deleteUseCase, "execute").mockResolvedValue();
      await controller.delete(inputMock);

      expect(deleteUseCase.execute).toHaveBeenCalledWith(
        activityId,
        challengeId,
      );
    });

    it("should throw a BadRequestException when no activity is found by the FindActivityByIdUseCase", async () => {
      jest.spyOn(deleteUseCase, "execute").mockResolvedValue();
      const expectedErrorMsg = t("en").activity.notFound;

      try {
        await controller.delete(inputMock);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toBe(expectedErrorMsg);
      }
    });

    it("should throw a BadRequestException if the activityId or challengeId passed in params has not a valid type", async () => {
      try {
        await controller.delete({
          activityId: "A1",
          challengeId: "@x2",
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).message).toMatch(
          "activityId: Invalid field; ",
        );
        expect((error as BadRequestException).message).toMatch(
          "challengeId: Invalid field",
        );
      }
    });
  });
});
