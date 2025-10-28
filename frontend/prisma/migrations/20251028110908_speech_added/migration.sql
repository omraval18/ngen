-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "speechId" TEXT;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "speechId" TEXT;

-- CreateTable
CREATE TABLE "Speech" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "s3Key" TEXT,
    "status" TEXT NOT NULL DEFAULT 'queued',
    "text" TEXT,
    "voice" TEXT,
    "language" TEXT,
    "inferStep" DOUBLE PRECISION,
    "audioDuration" DOUBLE PRECISION,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "listenCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Speech_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Speech_s3Key_idx" ON "Speech"("s3Key");

-- AddForeignKey
ALTER TABLE "Speech" ADD CONSTRAINT "Speech_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_speechId_fkey" FOREIGN KEY ("speechId") REFERENCES "Speech"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_speechId_fkey" FOREIGN KEY ("speechId") REFERENCES "Speech"("id") ON DELETE SET NULL ON UPDATE CASCADE;
