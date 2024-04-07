import express from "express";
import { admin } from "../controllers/admin/admin.js";

export const RouterAdm = express.Router();

// Route pour la page d'accueil de l'administration
RouterAdm.get("/", admin.admin);

//pour creer un admin
RouterAdm.post('/createAdmin', admin.addAdmin)

// Pour afficher les admins dans


// Route pour la connexion de l'administrateur
RouterAdm.post("/login", admin.login);

// Route pour la déconnexion de l'administrateur
RouterAdm.get("/logout", admin.logout);

// Route pour créer un psychologue
RouterAdm.post("/psychologists", admin.createPsychologist);

// Route pour afficher tous les psychologues
RouterAdm.get("/psychologists", admin.getAllPsychologists);

// Route pour rechercher un psychologue
RouterAdm.get("/psychologists/search", admin.searchPsychologue);

// Route pour valider ou désapprouver un psychologue
RouterAdm.post("/psychologists/validation", admin.validerpsychologue);

// Route pour supprimer un psychologue
RouterAdm.delete("/psychologists/:id", admin.supprimerpsychologue);

// Route pour afficher tous les rendez-vous
RouterAdm.get("/appointments", admin.showAllRdv);

// Route pour afficher tous les articles
RouterAdm.get("/articles", admin.showArticles);

// Route pour supprimer un article
RouterAdm.delete("/articles/:id", admin.delArticle);

// Route pour afficher tous les patients
RouterAdm.get("/patients", admin.showPatients);
