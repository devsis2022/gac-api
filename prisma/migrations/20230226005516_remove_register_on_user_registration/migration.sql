/*
  Warnings:

  - You are about to drop the column `registration` on the `user_registrations` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_registrations_registration_key";

-- AlterTable
ALTER TABLE "user_registrations" DROP COLUMN "registration";
