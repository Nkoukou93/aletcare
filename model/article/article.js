import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Articles = {
  //recuperation de tous les articles
  getAllArticles: async () => await prisma.article.findMany(),

  //creation d'un nouvel article
  createNewArticle: (data) => prisma.article.create({ data }),

  //recuperation d'un seul article par son id
  getOneArticle: async (id) =>
    await prisma.article.findUnique({ where: { id } }),

  //mise a jour d'un article
  updateArticle: async (id, data) =>
    prisma.article.update({ where: { id }, data }),

  //suppression d'un article
  deleteArticle: async (id) => await prisma.article.delete({ where: { id } }),
};

