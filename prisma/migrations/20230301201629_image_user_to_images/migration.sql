-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT[],
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "password" SET DATA TYPE TEXT;
