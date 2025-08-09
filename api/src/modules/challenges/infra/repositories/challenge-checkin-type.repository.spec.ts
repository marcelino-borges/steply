import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { ChallengeCheckInTypeRepository } from "@/modules/challenges/infra/repositories/challenge-checkin-type.repository";
import { MOCK_CHALLENGE_CHECKIN_TYPES } from "@/modules/challenges/__mocks__/challenge-checkin-type.mock";

describe("ChallengeCheckInTypeRepository", () => {
  let repository: ChallengeCheckInTypeRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengeCheckInTypeRepository, PrismaService],
    }).compile();

    repository = module.get<ChallengeCheckInTypeRepository>(
      ChallengeCheckInTypeRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return all challenge check-in types ordered by code", async () => {
      jest
        .spyOn(prismaService.challengeCheckInType, "findMany")
        .mockResolvedValue(MOCK_CHALLENGE_CHECKIN_TYPES as any);

      const result = await repository.findAll();

      expect(result).toEqual(MOCK_CHALLENGE_CHECKIN_TYPES);
      expect(prismaService.challengeCheckInType.findMany).toHaveBeenCalledWith({
        orderBy: { code: "asc" },
      });
      expect(prismaService.challengeCheckInType.findMany).toHaveBeenCalledTimes(1);
    });

    it("should return an empty array when no challenge check-in types exist", async () => {
      jest
        .spyOn(prismaService.challengeCheckInType, "findMany")
        .mockResolvedValue([]);

      const result = await repository.findAll();

      expect(result).toEqual([]);
      expect(prismaService.challengeCheckInType.findMany).toHaveBeenCalledWith({
        orderBy: { code: "asc" },
      });
    });
  });
});