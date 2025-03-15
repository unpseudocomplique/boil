-- AlterTable
ALTER TABLE "AccessProfile" ADD COLUMN     "manageProfiles" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "managerUsers" BOOLEAN NOT NULL DEFAULT false;
