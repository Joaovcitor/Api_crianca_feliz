-- CreateEnum
CREATE TYPE "PunchType" AS ENUM ('ENTRADA_MANHA', 'MEIO_MANHA', 'SAIDA_MANHA', 'ENTRADA_TARDE', 'MEIO_TARDE', 'SAIDA_TARDE', 'EXTRA');

-- CreateTable
CREATE TABLE "time_punches" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "type" "PunchType" NOT NULL,
    "notes" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "time_punches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "time_punches" ADD CONSTRAINT "time_punches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
