/*
  Warnings:

  - The primary key for the `Tags` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_ProblemToTags" DROP CONSTRAINT "_ProblemToTags_B_fkey";

-- AlterTable
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tags_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tags_id_seq";

-- AlterTable
ALTER TABLE "_ProblemToTags" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_ProblemToTags" ADD CONSTRAINT "_ProblemToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
