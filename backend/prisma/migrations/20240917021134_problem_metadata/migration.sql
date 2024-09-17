/*
  Warnings:

  - Added the required column `metadata` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProblemType" AS ENUM ('ALGORITHM', 'DESIGN');

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "metadata" TEXT NOT NULL,
ADD COLUMN     "type" "ProblemType" NOT NULL;
