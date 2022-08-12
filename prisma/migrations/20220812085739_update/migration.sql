/*
  Warnings:

  - Made the column `link` on table `bookmarks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bookmarks" ALTER COLUMN "link" SET NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
