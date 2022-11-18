/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cpf` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email" VARCHAR(30) NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "cpf" SET NOT NULL;

-- CreateTable
CREATE TABLE "auth" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_username_key" ON "auth"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
