import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Rdv = {
  //recuperer tous les rdv
  getAllRDV: async () => {
    const RDVs = await prisma.rDV.findMany();
    return RDVs;
  },

  //ajouter un nouvel rdv
  addRDV: async (data) => {
    const RDV = await prisma.rDV.create({
      data: data,
    });
    return RDV;
  },
  /* supprimer un rdv par son id*/
  deleteRDV: (id) => {
    return prisma.rDV.delete({
      where: { id: id },
    });
  },
  /*modifier un rdv */
  updateRDV: (id, data) => {
    return prisma.rDV.update({
      where: { id },
      data,
    });
  },
  //recupere le rdv d'un patient avec son idpatient
  getRDVPatient: (idpatient) => {
    return prisma.rDV.findMany({ where: { id_patient: idpatient } });
  },
  //recupere le rdv d'un medecin avec son id psychologue
  getRDVMedecin: (idpsychologue) => {
    return prisma.rDV.findFirst({ where: { id_medecin: idpsychologue } });
  },
  //statut du rdv
};

