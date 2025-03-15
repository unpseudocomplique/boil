/*
  Warnings:

  - A unique constraint covering the columns `[userId,firmId]` on the table `UserFirm` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserFirm_userId_firmId_accessProfileId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserFirm_userId_firmId_key" ON "UserFirm"("userId", "firmId");
