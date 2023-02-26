/*
  Warnings:

  - A unique constraint covering the columns `[registration_id]` on the table `class_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "class_users_registration_id_key" ON "class_users"("registration_id");
