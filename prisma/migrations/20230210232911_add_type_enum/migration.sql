-- AlterEnum
ALTER TYPE "InstitutionStatus" ADD VALUE 'repproved';

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_coordinator_id_fkey";

-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "coordinator_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_coordinator_id_fkey" FOREIGN KEY ("coordinator_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
