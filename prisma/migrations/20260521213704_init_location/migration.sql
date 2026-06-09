-- CreateEnum
CREATE TYPE "Country" AS ENUM ('PALESTINE', 'JORDAN', 'SAUDI_ARABIA', 'UAE', 'EGYPT', 'KUWAIT', 'QATAR', 'BAHRAIN', 'OMAN', 'LEBANON');

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
