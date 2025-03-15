-- CreateTable
CREATE TABLE "Firm" (
    "id" VARCHAR(25) NOT NULL,
    "display" TEXT NOT NULL,
    "subdomain" TEXT NOT NULL DEFAULT 'boil',

    CONSTRAINT "Firm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessProfile" (
    "id" VARCHAR(25) NOT NULL,
    "display" TEXT NOT NULL,
    "firmId" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccessProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(25) NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFirm" (
    "id" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firmId" VARCHAR(25) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "accessProfileId" VARCHAR(25) NOT NULL,

    CONSTRAINT "UserFirm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FirmToUser" (
    "A" VARCHAR(25) NOT NULL,
    "B" VARCHAR(25) NOT NULL,

    CONSTRAINT "_FirmToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Firm_subdomain_key" ON "Firm"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserFirm_userId_firmId_accessProfileId_key" ON "UserFirm"("userId", "firmId", "accessProfileId");

-- CreateIndex
CREATE INDEX "_FirmToUser_B_index" ON "_FirmToUser"("B");

-- AddForeignKey
ALTER TABLE "AccessProfile" ADD CONSTRAINT "AccessProfile_firmId_fkey" FOREIGN KEY ("firmId") REFERENCES "Firm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFirm" ADD CONSTRAINT "UserFirm_firmId_fkey" FOREIGN KEY ("firmId") REFERENCES "Firm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFirm" ADD CONSTRAINT "UserFirm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFirm" ADD CONSTRAINT "UserFirm_accessProfileId_fkey" FOREIGN KEY ("accessProfileId") REFERENCES "AccessProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FirmToUser" ADD CONSTRAINT "_FirmToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Firm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FirmToUser" ADD CONSTRAINT "_FirmToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
