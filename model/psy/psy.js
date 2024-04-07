import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const psychologues = {
  //recuperer tous les psychologues
  getAllPsychologues: async () => await prisma.psychologue.findMany(),

  //recuperer un psychologue par son email et un mot de passe
  getPsycholoqueByEmailAndPassword: (email, password) =>
    prisma.psychologue.findUnique({ where: { email, password } }),

  //recupération  d'un psychologue par son id
  getOnePsychologueById: async (id) =>
    await prisma.psychologue.findUnique({ where: { id } }),
  //recuperer un psychologue par son nom ou son email ou sa specialite
  searchPsychologue: (name, email, specialite) =>
    prisma
      .$transaction(
        async[
          (prisma.psychologue.findFirst({
            where: { name_contains: name, email_contains: email },
          }),
          prisma.specialite.findFirst({
            select: { psychologues: true, name_contains: specialite },
          }))
        ]
      )
      .then(([psychologue1, specialite]) => {
        const psychologues2 = specialite ? psychologue1?.psychologues : [];
        return [psychologue1, ...psychologues2];
      }),

  //Approuver ou désaprouver un psychologue
  setStatusToPsychologist: (id, status) =>
    prisma.psychologue.update({
      where: { id },
      data: { status },
    }),

  //ajout un psychologue
  addPsychologue: async (psychologue) =>
    await prisma.psychologue.create({ data: psychologue }),

  //suppression un psychologue par son id
  deletePsyById: (id) => prisma.psychologue.delete({ where: { id } }),

  //modification du  mot de passe d'un psycholoque en fonction de son email
  updatePasswordByEmail: (email, password) => {
    return prisma.psychologue.update({ where: { email }, data: { password } });
  },
};
 
