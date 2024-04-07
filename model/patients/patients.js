import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Patients = {
  //recuperer tous les patients de la BDD
  getAllPatient: async () => await prisma.patient.findMany(),

  //ajouter un patient à la BDD
  addPatient: async (req, res) => {
    try {
      const patient = await prisma.patient.create({
        data: req.body,
      });
      res.status(200).send(patient);
    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur serveur");
    }
  },

  //récupérer un patient par son id
  getPatientById: async (id) => await prisma.patient.findUnique({ where: { id } }),
  //recuperer un patient par son email
  getByEmailAndPassword: async(req,res)=>{
    const {email, password}=req.body
    const patient=await prisma.patient.findUnique({where:{email, password}})

    
  },
  

  //modifier un patient en fonction de son id
  updatePatient: async (id, data) => {
    try {
      const patient = await prisma.patient.update({
        where: { id },
        data,
      });
      return patient;
    } catch (error) {
      console.log(error);
    }
  },
};
  

