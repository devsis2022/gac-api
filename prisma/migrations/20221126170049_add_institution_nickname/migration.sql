/*
  Warnings:

  - A unique constraint covering the columns `[nickname]` on the table `institutions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "institutions" ADD COLUMN     "nickname" VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "institutions_nickname_key" ON "institutions"("nickname");
