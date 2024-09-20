/*
  Warnings:

  - Added the required column `passed` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "error" TEXT,
ADD COLUMN     "passed" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TestCase" (
    "id" INTEGER NOT NULL,
    "problem_id" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("problem_id","id")
);

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
