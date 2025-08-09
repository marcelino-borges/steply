import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { PRISMA_MOCK } from "@/test/__mocks__/prisma.mock";
import {
  EXISTING_ACTIVITY,
  NON_EXISTING_ACTIVITY,
} from "@/modules/challenges/__mocks__/activity.mock";
import { ActivityRepository } from "./activity.repository";
import { getSafePagination } from "../utils/challenge.utils";
import { PaginatedItems } from "@/core/application/dtos/paginated-result.dto";
import { ActivitiesQueryBuilderDto } from "../../application/dtos/activity-query.dto";

describe("ActivityRepository", () => {
  let prismaService: PrismaService;
  let repo: ActivityRepository;
  const activityId = 1;
  const challengeId = EXISTING_ACTIVITY.challengeId;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityRepository,
        {
          provide: PrismaService,
          useValue: PRISMA_MOCK,
        },
      ],
    }).compile();

    prismaService = module.get(PrismaService);
    repo = module.get(ActivityRepository);
  });

  describe("query", () => {
    it("should call the database function with no props, to find all activities when no params are passed, and return the result", async () => {
      const findManySpy = jest
        .spyOn(prismaService.challengeActivity, "findMany")
        .mockResolvedValue([EXISTING_ACTIVITY]);

      const countSpy = jest
        .spyOn(prismaService.challengeActivity, "count")
        .mockResolvedValue(1);

      const { pageNumber, pageSize } = getSafePagination(undefined, undefined);

      const result = await repo.query(challengeId);

      const expectedResult = new PaginatedItems(
        [EXISTING_ACTIVITY],
        1,
        pageNumber,
        pageSize,
      );

      expect(findManySpy).toHaveBeenCalledWith({
        where: {
          challengeId,
          AND: [
            {
              OR: [
                {
                  challenge: {
                    OR: [],
                  },
                },
              ],
            },
          ],
        },
        take: pageSize,
        skip: pageNumber,
      });

      expect(countSpy).toHaveBeenCalledWith({
        where: {
          challengeId,
          AND: [
            {
              OR: [
                {
                  challenge: {
                    OR: [],
                  },
                },
              ],
            },
          ],
        },
      });

      expect(result).toEqual(expectedResult);
    });
  });

  describe("create", () => {
    it("should call the database function to create an activity", async () => {
      const createSpy = jest
        .spyOn(prismaService.challengeActivity, "create")
        .mockResolvedValue(EXISTING_ACTIVITY);

      await repo.create(NON_EXISTING_ACTIVITY, challengeId);

      expect(createSpy).toHaveBeenCalledWith({
        data: {
          ...NON_EXISTING_ACTIVITY,
          challengeId,
        },
      });
    });

    it("should return the activity created on database", async () => {
      jest
        .spyOn(prismaService.challengeActivity, "create")
        .mockResolvedValue(EXISTING_ACTIVITY);

      const result = await repo.create(
        NON_EXISTING_ACTIVITY,
        EXISTING_ACTIVITY.id,
      );

      expect(result).toStrictEqual(EXISTING_ACTIVITY);
    });
  });

  describe("update", () => {
    const updatedData = {
      ...EXISTING_ACTIVITY,
      title: "Updated title",
    };

    it("should call the database function to update an activity", async () => {
      const updateSpy = jest
        .spyOn(prismaService.challengeActivity, "update")
        .mockResolvedValue(updatedData);

      await repo.update(EXISTING_ACTIVITY, challengeId);

      expect(updateSpy).toHaveBeenCalledWith({
        where: {
          id: EXISTING_ACTIVITY.id,
          challengeId,
        },
        data: EXISTING_ACTIVITY,
      });
    });

    it("should return the activity updated on database", async () => {
      jest
        .spyOn(prismaService.challengeActivity, "update")
        .mockResolvedValue(updatedData);

      const result = await repo.update(updatedData, updatedData.challengeId);

      expect(result).toStrictEqual(updatedData);
    });
  });

  describe("delete", () => {
    it("should call the database function to delete an activity by id", async () => {
      const findByIdSpy = jest.spyOn(prismaService.challengeActivity, "delete");

      await repo.delete(activityId, challengeId);

      expect(findByIdSpy).toHaveBeenCalledWith({
        where: {
          id: activityId,
          challengeId,
        },
      });
    });
  });
});
