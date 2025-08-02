-- AddForeignKey
ALTER TABLE "UserInterestGeneral" ADD CONSTRAINT "UserInterestGeneral_interestGeneralId_fkey" FOREIGN KEY ("interestGeneralId") REFERENCES "InterestGeneral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInterestActivity" ADD CONSTRAINT "UserInterestActivity_interestActivityId_fkey" FOREIGN KEY ("interestActivityId") REFERENCES "InterestActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
