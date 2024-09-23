/*
  Warnings:

  - Added the required column `sol` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sol_lang_id` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "sol" TEXT NOT NULL,
ADD COLUMN     "sol_lang_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_sol_lang_id_fkey" FOREIGN KEY ("sol_lang_id") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
