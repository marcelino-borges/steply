-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT DEFAULT '';

-- CreateTable
CREATE TABLE "InterestGeneral" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,

    CONSTRAINT "InterestGeneral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInterestGeneral" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "interestGeneralId" INTEGER NOT NULL,

    CONSTRAINT "UserInterestGeneral_pkey" PRIMARY KEY ("userId","interestGeneralId")
);

-- CreateTable
CREATE TABLE "InterestActivity" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,

    CONSTRAINT "InterestActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInterestActivity" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "interestActivityId" INTEGER NOT NULL,

    CONSTRAINT "UserInterestActivity_pkey" PRIMARY KEY ("userId","interestActivityId")
);

-- AddForeignKey
ALTER TABLE "UserInterestGeneral" ADD CONSTRAINT "UserInterestGeneral_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInterestActivity" ADD CONSTRAINT "UserInterestActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
