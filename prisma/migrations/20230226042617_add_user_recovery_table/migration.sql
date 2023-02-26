-- CreateTable
CREATE TABLE "recoveries" (
    "user_id" INTEGER NOT NULL,
    "recovery_code" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "recoveries_user_id_key" ON "recoveries"("user_id");

-- AddForeignKey
ALTER TABLE "recoveries" ADD CONSTRAINT "recoveries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
