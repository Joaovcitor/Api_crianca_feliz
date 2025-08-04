/*
  Warnings:

  - You are about to drop the column `visitadorId` on the `Notificacoes` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Notificacoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notificacoes" DROP CONSTRAINT "Notificacoes_visitadorId_fkey";

-- AlterTable
ALTER TABLE "Notificacoes" DROP COLUMN "visitadorId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Notificacoes" ADD CONSTRAINT "Notificacoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
