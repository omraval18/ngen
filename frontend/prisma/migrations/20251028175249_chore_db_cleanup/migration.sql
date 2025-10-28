/*
  Warnings:

  - You are about to drop the column `audioDuration` on the `Speech` table. All the data in the column will be lost.
  - You are about to drop the column `inferStep` on the `Speech` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Speech" DROP COLUMN "audioDuration",
DROP COLUMN "inferStep";
