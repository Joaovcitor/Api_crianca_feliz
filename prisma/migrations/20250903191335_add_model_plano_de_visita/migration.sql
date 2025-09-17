-- CreateTable
CREATE TABLE "ModeloPlanoDeVisitas" (
    "id" SERIAL NOT NULL,
    "faixa_etaria" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "etapa1" TEXT NOT NULL,
    "etapa2" TEXT NOT NULL,
    "etapa3" TEXT NOT NULL,

    CONSTRAINT "ModeloPlanoDeVisitas_pkey" PRIMARY KEY ("id")
);
