/*
  Warnings:

  - You are about to drop the `formularios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "formularios" DROP CONSTRAINT "formularios_childId_fkey";

-- DropForeignKey
ALTER TABLE "formularios" DROP CONSTRAINT "formularios_visitadorId_fkey";

-- DropTable
DROP TABLE "formularios";

-- CreateTable
CREATE TABLE "modelosDeFormularios" (
    "id" SERIAL NOT NULL,
    "tipo" "TiposFormularios" NOT NULL,
    "etapa" INTEGER NOT NULL,
    "estrutura" JSONB,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "modelosDeFormularios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroDeFormularios" (
    "id" SERIAL NOT NULL,
    "modeloId" INTEGER NOT NULL,
    "respostas" JSONB NOT NULL,
    "childId" INTEGER,
    "caregiverId" INTEGER,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "RegistroDeFormularios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "modelosDeFormularios" ADD CONSTRAINT "modelosDeFormularios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroDeFormularios" ADD CONSTRAINT "RegistroDeFormularios_modeloId_fkey" FOREIGN KEY ("modeloId") REFERENCES "modelosDeFormularios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroDeFormularios" ADD CONSTRAINT "RegistroDeFormularios_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroDeFormularios" ADD CONSTRAINT "RegistroDeFormularios_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroDeFormularios" ADD CONSTRAINT "RegistroDeFormularios_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "Caregivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
