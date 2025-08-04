/*
  Warnings:

  - The values [Dificil] on the enum `enum_PlanosDeVisitas_grau_de_dificuldade_objetivo` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `coordenadorId` on the `Notificacoes` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorId` on the `Notificacoes` table. All the data in the column will be lost.
  - Made the column `visitadorId` on table `Notificacoes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "enum_PlanosDeVisitas_grau_de_dificuldade_objetivo_new" AS ENUM ('Fácil', 'Média', 'Difícil');
ALTER TABLE "PlanosDeVisitas" ALTER COLUMN "grau_de_dificuldade_objetivo" TYPE "enum_PlanosDeVisitas_grau_de_dificuldade_objetivo_new" USING ("grau_de_dificuldade_objetivo"::text::"enum_PlanosDeVisitas_grau_de_dificuldade_objetivo_new");
ALTER TYPE "enum_PlanosDeVisitas_grau_de_dificuldade_objetivo" RENAME TO "enum_PlanosDeVisitas_grau_de_dificuldade_objetivo_old";
ALTER TYPE "enum_PlanosDeVisitas_grau_de_dificuldade_objetivo_new" RENAME TO "enum_PlanosDeVisitas_grau_de_dificuldade_objetivo";
DROP TYPE "enum_PlanosDeVisitas_grau_de_dificuldade_objetivo_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Notificacoes" DROP CONSTRAINT "Notificacoes_coordenadorId_fkey";

-- DropForeignKey
ALTER TABLE "Notificacoes" DROP CONSTRAINT "Notificacoes_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "Notificacoes" DROP CONSTRAINT "Notificacoes_visitadorId_fkey";

-- AlterTable
ALTER TABLE "Notificacoes" DROP COLUMN "coordenadorId",
DROP COLUMN "supervisorId",
ALTER COLUMN "visitadorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Notificacoes" ADD CONSTRAINT "Notificacoes_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
