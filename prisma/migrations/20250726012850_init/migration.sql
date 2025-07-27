-- CreateEnum
CREATE TYPE "enum_Chamados_tipo_do_chamado" AS ENUM ('bug', 'duvida', 'edicao', 'outros');

-- CreateEnum
CREATE TYPE "enum_Child_sexo" AS ENUM ('Masculino', 'Feminino');

-- CreateEnum
CREATE TYPE "EtapaAnswer" AS ENUM ('Consegue fazer sozinho', 'Consegue fazer com Ajuda', 'Ainda não consegue fazer');

-- CreateEnum
CREATE TYPE "enum_Notificacoes_notificacao_tipo" AS ENUM ('Evento', 'Reunião', 'Falta', 'Outras');

-- CreateEnum
CREATE TYPE "enum_PlanosDeVisitas_conseguiu_fazer" AS ENUM ('Com ajuda', 'Sem ajuda', 'Não quis fazer');

-- CreateEnum
CREATE TYPE "enum_PlanosDeVisitas_grau_de_dificuldade_objetivo" AS ENUM ('Fácil', 'Média', 'Dificil');

-- CreateEnum
CREATE TYPE "enum_TabelasDeVisitas_dayOfVisit" AS ENUM ('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta');

-- CreateEnum
CREATE TYPE "enum_TabelasDeVisitas_period" AS ENUM ('Manhã', 'Tarde');

-- CreateEnum
CREATE TYPE "enum_Users_role" AS ENUM ('visitador', 'supervisor', 'coordenador');

-- CreateTable
CREATE TABLE "Caregivers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(255) NOT NULL,
    "rg" VARCHAR(255),
    "address" VARCHAR(255),
    "district" VARCHAR(255),
    "contact" VARCHAR(255),
    "born" TIMESTAMPTZ(6),
    "pregnant" BOOLEAN,
    "isPending" BOOLEAN DEFAULT true,
    "supervisorId" INTEGER,
    "visitadorId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "week_pregnant" INTEGER DEFAULT 0,

    CONSTRAINT "Caregivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chamados" (
    "id" SERIAL NOT NULL,
    "tipo_do_chamado" "enum_Chamados_tipo_do_chamado" NOT NULL,
    "descricao" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "userIdDestinatario" INTEGER,

    CONSTRAINT "Chamados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Child" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nis" VARCHAR(255),
    "born" TIMESTAMPTZ(6),
    "visitadorId" INTEGER,
    "caregiverId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "isPending" BOOLEAN DEFAULT true,
    "sexo" "enum_Child_sexo",
    "isBpc" BOOLEAN DEFAULT true,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etapa1" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "q7" "EtapaAnswer" NOT NULL,
    "q8" "EtapaAnswer" NOT NULL,
    "q9" "EtapaAnswer" NOT NULL,
    "q10" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Etapa1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etapa2" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "q7" "EtapaAnswer" NOT NULL,
    "q8" "EtapaAnswer" NOT NULL,
    "q9" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Etapa2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etapa3" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "q7" "EtapaAnswer" NOT NULL,
    "q8" "EtapaAnswer" NOT NULL,
    "q9" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Etapa3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etapa4" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "q7" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Etapa4_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etapa5" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Etapa5_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etapa6" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "q7" "EtapaAnswer" NOT NULL,
    "q8" "EtapaAnswer" NOT NULL,
    "q9" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Etapa6_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etapa7" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "q7" "EtapaAnswer" NOT NULL,
    "q8" "EtapaAnswer" NOT NULL,
    "q9" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Etapa7_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faltas" (
    "id" SERIAL NOT NULL,
    "motivo_da_falta" TEXT NOT NULL,
    "quando_ocorreu_a_falta" DATE,
    "falta_invalidada" BOOLEAN DEFAULT false,
    "pedir_para_invalidar_falta" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "userId" INTEGER NOT NULL,
    "registradorId" INTEGER NOT NULL,
    "pedido_para_invalidar_aceito" BOOLEAN DEFAULT false,
    "motivo_falta_justificada" TEXT,
    "falta_justificada" BOOLEAN DEFAULT false,

    CONSTRAINT "Faltas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacoes" (
    "id" SERIAL NOT NULL,
    "notificacao_tipo" "enum_Notificacoes_notificacao_tipo" NOT NULL,
    "descricao" TEXT NOT NULL,
    "visitadorId" INTEGER,
    "supervisorId" INTEGER,
    "coordenadorId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Notificacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanosDeVisitas" (
    "id" SERIAL NOT NULL,
    "objetivo" TEXT NOT NULL,
    "etapa1" TEXT NOT NULL,
    "etapa2" TEXT NOT NULL,
    "etapa3" TEXT NOT NULL,
    "observacao" TEXT,
    "dia_de_visita_realizado" TIMESTAMPTZ(6),
    "dia_a_ser_realizada_a_visita" TIMESTAMPTZ(6) NOT NULL,
    "grau_de_dificuldade_objetivo" "enum_PlanosDeVisitas_grau_de_dificuldade_objetivo" NOT NULL,
    "conseguiu_fazer" "enum_PlanosDeVisitas_conseguiu_fazer",
    "fez_com_dificuldade" BOOLEAN DEFAULT false,
    "visitadorId" INTEGER,
    "childId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "CaregiverId" INTEGER,

    CONSTRAINT "PlanosDeVisitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SequelizeMeta" (
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "TabelasDeVisitas" (
    "id" SERIAL NOT NULL,
    "dateOfVisit" TIMESTAMP(3),
    "childVisited" VARCHAR(255) NOT NULL,
    "dayOfVisit" "enum_TabelasDeVisitas_dayOfVisit" NOT NULL,
    "period" "enum_TabelasDeVisitas_period" NOT NULL,
    "visitadorId" INTEGER,
    "childId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "caregiverId" INTEGER,

    CONSTRAINT "TabelasDeVisitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "enum_Users_role" NOT NULL,
    "cpf" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "territorio" VARCHAR(255) NOT NULL,
    "cras" VARCHAR(255),
    "isPending" BOOLEAN DEFAULT true,
    "isActive" BOOLEAN DEFAULT false,
    "restrictionMakePlain" BOOLEAN DEFAULT false,
    "restrictLoginVisitPending" BOOLEAN DEFAULT false,
    "early_access" BOOLEAN DEFAULT false,
    "supervisorId" INTEGER,
    "coordenadorId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitasPorGeolocalizacaos" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "hora_inicio" TIMESTAMPTZ(6),
    "hora_fim" TIMESTAMPTZ(6),
    "latitude_final" DOUBLE PRECISION,
    "longitude_final" DOUBLE PRECISION,
    "finalizou" BOOLEAN DEFAULT false,
    "visita_mentirosa" BOOLEAN DEFAULT false,
    "pendente_de_validacao" BOOLEAN DEFAULT true,
    "motivo_da_nao_realizacao" VARCHAR(255),
    "motivo_da_invalidacao" VARCHAR(255),
    "beneficiario_em_casa" BOOLEAN DEFAULT true,
    "latitude_beneficiario" DOUBLE PRECISION,
    "longitude_beneficiario" DOUBLE PRECISION,
    "data_que_vai_ser_realizada" TIMESTAMPTZ(6) NOT NULL,
    "visita_marcada_finalizada" BOOLEAN DEFAULT false,
    "visita_em_andamento" BOOLEAN DEFAULT false,
    "visitadorId" INTEGER,
    "childId" INTEGER,
    "planoId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "caregiverId" INTEGER,

    CONSTRAINT "VisitasPorGeolocalizacaos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form7-Etapa1s" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "q7" "EtapaAnswer" NOT NULL,
    "q8" "EtapaAnswer" NOT NULL,
    "q9" "EtapaAnswer" NOT NULL,
    "q10" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "form7-Etapa1s_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form7-Etapa2s" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "q7" "EtapaAnswer" NOT NULL,
    "q8" "EtapaAnswer" NOT NULL,
    "q9" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "form7-Etapa2s_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form7-Etapa3s" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "q7" "EtapaAnswer" NOT NULL,
    "q8" "EtapaAnswer" NOT NULL,
    "q9" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "form7-Etapa3s_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form7-Etapa4s" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "q7" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "form7-Etapa4s_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form7-Etapa5s" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "form7-Etapa5s_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form7-Etapa6s" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "q7" "EtapaAnswer" NOT NULL,
    "q8" "EtapaAnswer" NOT NULL,
    "q9" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "form7-Etapa6s_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form7-Etapa7s" (
    "id" SERIAL NOT NULL,
    "q1" "EtapaAnswer" NOT NULL,
    "q2" "EtapaAnswer" NOT NULL,
    "q3" "EtapaAnswer" NOT NULL,
    "q4" "EtapaAnswer" NOT NULL,
    "q5" "EtapaAnswer" NOT NULL,
    "q6" "EtapaAnswer" NOT NULL,
    "q7" "EtapaAnswer" NOT NULL,
    "q8" "EtapaAnswer" NOT NULL,
    "q9" "EtapaAnswer" NOT NULL,
    "childId" INTEGER NOT NULL,
    "visitadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "form7-Etapa7s_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Caregivers_cpf_key" ON "Caregivers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Users_cpf_key" ON "Users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Caregivers" ADD CONSTRAINT "Caregivers_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Caregivers" ADD CONSTRAINT "Caregivers_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Chamados" ADD CONSTRAINT "Chamados_userIdDestinatario_fkey" FOREIGN KEY ("userIdDestinatario") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Chamados" ADD CONSTRAINT "Chamados_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "Caregivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa1" ADD CONSTRAINT "Etapa1_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa1" ADD CONSTRAINT "Etapa1_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa2" ADD CONSTRAINT "Etapa2_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa2" ADD CONSTRAINT "Etapa2_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa3" ADD CONSTRAINT "Etapa3_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa3" ADD CONSTRAINT "Etapa3_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa4" ADD CONSTRAINT "Etapa4_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa4" ADD CONSTRAINT "Etapa4_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa5" ADD CONSTRAINT "Etapa5_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa5" ADD CONSTRAINT "Etapa5_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa6" ADD CONSTRAINT "Etapa6_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa6" ADD CONSTRAINT "Etapa6_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa7" ADD CONSTRAINT "Etapa7_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Etapa7" ADD CONSTRAINT "Etapa7_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Faltas" ADD CONSTRAINT "Faltas_registradorId_fkey" FOREIGN KEY ("registradorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Faltas" ADD CONSTRAINT "Faltas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Notificacoes" ADD CONSTRAINT "Notificacoes_coordenadorId_fkey" FOREIGN KEY ("coordenadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Notificacoes" ADD CONSTRAINT "Notificacoes_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Notificacoes" ADD CONSTRAINT "Notificacoes_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlanosDeVisitas" ADD CONSTRAINT "PlanosDeVisitas_CaregiverId_fkey" FOREIGN KEY ("CaregiverId") REFERENCES "Caregivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlanosDeVisitas" ADD CONSTRAINT "PlanosDeVisitas_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlanosDeVisitas" ADD CONSTRAINT "PlanosDeVisitas_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TabelasDeVisitas" ADD CONSTRAINT "TabelasDeVisitas_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "Caregivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TabelasDeVisitas" ADD CONSTRAINT "TabelasDeVisitas_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TabelasDeVisitas" ADD CONSTRAINT "TabelasDeVisitas_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_coordenadorId_fkey" FOREIGN KEY ("coordenadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VisitasPorGeolocalizacaos" ADD CONSTRAINT "VisitasPorGeolocalizacaos_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "Caregivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VisitasPorGeolocalizacaos" ADD CONSTRAINT "VisitasPorGeolocalizacaos_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VisitasPorGeolocalizacaos" ADD CONSTRAINT "VisitasPorGeolocalizacaos_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "PlanosDeVisitas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VisitasPorGeolocalizacaos" ADD CONSTRAINT "VisitasPorGeolocalizacaos_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa1s" ADD CONSTRAINT "form7-Etapa1s_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa1s" ADD CONSTRAINT "form7-Etapa1s_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa2s" ADD CONSTRAINT "form7-Etapa2s_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa2s" ADD CONSTRAINT "form7-Etapa2s_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa3s" ADD CONSTRAINT "form7-Etapa3s_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa3s" ADD CONSTRAINT "form7-Etapa3s_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa4s" ADD CONSTRAINT "form7-Etapa4s_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa4s" ADD CONSTRAINT "form7-Etapa4s_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa5s" ADD CONSTRAINT "form7-Etapa5s_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa5s" ADD CONSTRAINT "form7-Etapa5s_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa6s" ADD CONSTRAINT "form7-Etapa6s_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa6s" ADD CONSTRAINT "form7-Etapa6s_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa7s" ADD CONSTRAINT "form7-Etapa7s_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "form7-Etapa7s" ADD CONSTRAINT "form7-Etapa7s_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
