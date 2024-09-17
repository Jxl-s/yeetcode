/*
  Warnings:

  - The values [ALGORITHM] on the enum `ProblemType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProblemType_new" AS ENUM ('ALGO', 'DESIGN');
ALTER TABLE "Problem" ALTER COLUMN "type" TYPE "ProblemType_new" USING ("type"::text::"ProblemType_new");
ALTER TYPE "ProblemType" RENAME TO "ProblemType_old";
ALTER TYPE "ProblemType_new" RENAME TO "ProblemType";
DROP TYPE "ProblemType_old";
COMMIT;
