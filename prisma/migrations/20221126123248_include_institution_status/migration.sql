-- CreateEnum
CREATE TYPE "InstitutionStatus" AS ENUM ('active', 'pending');

-- AlterTable
ALTER TABLE "institutions" ADD COLUMN     "status" "InstitutionStatus" NOT NULL DEFAULT 'pending';
