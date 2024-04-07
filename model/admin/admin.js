import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const Administrateurs = {
  //recuperer tous les administrateurs
  getAllAdmin: async () => {
    const admins = await prisma.administrateur.findMany();
    return admins;
  },
  //recuperer un administrateur
  getOneAdmin: async (req, res) => {
    try{
      let {id}=req.body;
      const admin=await prisma.administrateur.findUnique({where:{id}});
       if(!admin){return res.status(404).send("Cet administrateur n'existe pas.")}
       return res.status(200).send(admin);
     }catch(e){
       console.log(e);
       return res.status(500).send("Erreur serveur");
     }
    },
   //ajouter un administrateur
   addAdmin: async (req,res) => {
     try{
       const admin=await prisma.administrateur.create({data:req.body});
       return res.status(200).send(admin);
     }catch(e){
       console.log(e);
       return res.status(500).send("Erreur serveur");
     }
   
   }
  }
  

  
