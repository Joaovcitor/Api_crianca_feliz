/*
  Warnings:

  - You are about to drop the `Etapa1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Etapa2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Etapa3` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Etapa4` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Etapa5` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Etapa6` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Etapa7` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form7-Etapa1s` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form7-Etapa2s` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form7-Etapa3s` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form7-Etapa4s` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form7-Etapa5s` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form7-Etapa6s` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form7-Etapa7s` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TiposFormularios" AS ENUM ('tipo5', 'tipo7');

-- DropForeignKey
ALTER TABLE "Etapa1" DROP CONSTRAINT "Etapa1_childId_fkey";

-- DropForeignKey
ALTER TABLE "Etapa1" DROP CONSTRAINT "Etapa1_visitadorId_fkey";

-- DropForeignKey
ALTER TABLE "Etapa2" DROP CONSTRAINT "Etapa2_childId_fkey";

-- DropForeignKey
ALTER TABLE "Etapa2" DROP CONSTRAINT "Etapa2_visitadorId_fkey";

-- DropForeignKey
ALTER TABLE "Etapa3" DROP CONSTRAINT "Etapa3_childId_fkey";

-- DropForeignKey
ALTER TABLE "Etapa3" DROP CONSTRAINT "Etapa3_visitadorId_fkey";

-- DropForeignKey
ALTER TABLE "Etapa4" DROP CONSTRAINT "Etapa4_childId_fkey";

-- DropForeignKey
ALTER TABLE "Etapa4" DROP CONSTRAINT "Etapa4_visitadorId_fkey";

-- DropForeignKey
ALTER TABLE "Etapa5" DROP CONSTRAINT "Etapa5_childId_fkey";

-- DropForeignKey
ALTER TABLE "Etapa5" DROP CONSTRAINT "Etapa5_visitadorId_fkey";

-- DropForeignKey
ALTER TABLE "Etapa6" DROP CONSTRAINT "Etapa6_childId_fkey";

-- DropForeignKey
ALTER TABLE "Etapa6" DROP CONSTRAINT "Etapa6_visitadorId_fkey";

-- DropForeignKey
ALTER TABLE "Etapa7" DROP CONSTRAINT "Etapa7_childId_fkey";

-- DropForeignKey
ALTER TABLE "Etapa7" DROP CONSTRAINT "Etapa7_visitadorId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa1s" DROP CONSTRAINT "form7-Etapa1s_childId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa1s" DROP CONSTRAINT "form7-Etapa1s_visitadorId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa2s" DROP CONSTRAINT "form7-Etapa2s_childId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa2s" DROP CONSTRAINT "form7-Etapa2s_visitadorId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa3s" DROP CONSTRAINT "form7-Etapa3s_childId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa3s" DROP CONSTRAINT "form7-Etapa3s_visitadorId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa4s" DROP CONSTRAINT "form7-Etapa4s_childId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa4s" DROP CONSTRAINT "form7-Etapa4s_visitadorId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa5s" DROP CONSTRAINT "form7-Etapa5s_childId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa5s" DROP CONSTRAINT "form7-Etapa5s_visitadorId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa6s" DROP CONSTRAINT "form7-Etapa6s_childId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa6s" DROP CONSTRAINT "form7-Etapa6s_visitadorId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa7s" DROP CONSTRAINT "form7-Etapa7s_childId_fkey";

-- DropForeignKey
ALTER TABLE "form7-Etapa7s" DROP CONSTRAINT "form7-Etapa7s_visitadorId_fkey";

-- DropTable
DROP TABLE "Etapa1";

-- DropTable
DROP TABLE "Etapa2";

-- DropTable
DROP TABLE "Etapa3";

-- DropTable
DROP TABLE "Etapa4";

-- DropTable
DROP TABLE "Etapa5";

-- DropTable
DROP TABLE "Etapa6";

-- DropTable
DROP TABLE "Etapa7";

-- DropTable
DROP TABLE "form7-Etapa1s";

-- DropTable
DROP TABLE "form7-Etapa2s";

-- DropTable
DROP TABLE "form7-Etapa3s";

-- DropTable
DROP TABLE "form7-Etapa4s";

-- DropTable
DROP TABLE "form7-Etapa5s";

-- DropTable
DROP TABLE "form7-Etapa6s";

-- DropTable
DROP TABLE "form7-Etapa7s";

-- CreateTable
CREATE TABLE "formularios" (
    "id" SERIAL NOT NULL,
    "tipo" "TiposFormularios" NOT NULL,
    "etapa" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "respostas" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "formularios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "formularios" ADD CONSTRAINT "formularios_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formularios" ADD CONSTRAINT "formularios_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
