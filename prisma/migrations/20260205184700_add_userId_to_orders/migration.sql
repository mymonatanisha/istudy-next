-- AlterTable
ALTER TABLE "orders" ADD COLUMN "userId" INTEGER;

-- CreateIndex
CREATE INDEX "orders_userId_idx" ON "orders"("userId");
