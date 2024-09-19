/*
  Warnings:

  - You are about to drop the column `execution_time` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `memory_usage` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `memory` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runtime` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "execution_time",
DROP COLUMN "memory_usage",
ADD COLUMN     "memory" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "runtime" DECIMAL(65,30) NOT NULL;
