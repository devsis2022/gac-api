-- CreateEnum
CREATE TYPE "UserRoleStatus" AS ENUM ('active', 'pending', 'rejected');

-- AlterTable
ALTER TABLE "user_roles" ADD COLUMN     "status" "UserRoleStatus" NOT NULL DEFAULT 'active';
