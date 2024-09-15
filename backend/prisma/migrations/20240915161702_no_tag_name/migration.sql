/*
  Warnings:

  - You are about to drop the column `name` on the `Tags` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Tags_name_key";

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "name";
