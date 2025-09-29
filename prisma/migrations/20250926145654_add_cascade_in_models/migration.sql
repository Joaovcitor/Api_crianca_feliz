-- DropForeignKey
ALTER TABLE "Child" DROP CONSTRAINT "Child_caregiverId_fkey";

-- DropForeignKey
ALTER TABLE "PlanosDeVisitas" DROP CONSTRAINT "PlanosDeVisitas_CaregiverId_fkey";

-- DropForeignKey
ALTER TABLE "PlanosDeVisitas" DROP CONSTRAINT "PlanosDeVisitas_childId_fkey";

-- DropForeignKey
ALTER TABLE "TabelasDeVisitas" DROP CONSTRAINT "TabelasDeVisitas_caregiverId_fkey";

-- DropForeignKey
ALTER TABLE "TabelasDeVisitas" DROP CONSTRAINT "TabelasDeVisitas_childId_fkey";

-- DropForeignKey
ALTER TABLE "VisitasPorGeolocalizacaos" DROP CONSTRAINT "VisitasPorGeolocalizacaos_caregiverId_fkey";

-- DropForeignKey
ALTER TABLE "VisitasPorGeolocalizacaos" DROP CONSTRAINT "VisitasPorGeolocalizacaos_childId_fkey";

-- DropForeignKey
ALTER TABLE "VisitasPorGeolocalizacaos" DROP CONSTRAINT "VisitasPorGeolocalizacaos_planoId_fkey";

-- DropForeignKey
ALTER TABLE "VisitasPorGeolocalizacaos" DROP CONSTRAINT "VisitasPorGeolocalizacaos_visitadorId_fkey";

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "Caregivers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlanosDeVisitas" ADD CONSTRAINT "PlanosDeVisitas_CaregiverId_fkey" FOREIGN KEY ("CaregiverId") REFERENCES "Caregivers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlanosDeVisitas" ADD CONSTRAINT "PlanosDeVisitas_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TabelasDeVisitas" ADD CONSTRAINT "TabelasDeVisitas_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "Caregivers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TabelasDeVisitas" ADD CONSTRAINT "TabelasDeVisitas_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VisitasPorGeolocalizacaos" ADD CONSTRAINT "VisitasPorGeolocalizacaos_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "Caregivers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VisitasPorGeolocalizacaos" ADD CONSTRAINT "VisitasPorGeolocalizacaos_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VisitasPorGeolocalizacaos" ADD CONSTRAINT "VisitasPorGeolocalizacaos_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "PlanosDeVisitas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VisitasPorGeolocalizacaos" ADD CONSTRAINT "VisitasPorGeolocalizacaos_visitadorId_fkey" FOREIGN KEY ("visitadorId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
