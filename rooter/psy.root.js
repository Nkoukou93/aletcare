import express from "express";
import{psycontroller} from "../controllers/psychologue/psy.js";

export const routerpsy = express.Router();

// Route pour la page d'accueil du psychologue
routerpsy.get("/", psycontroller.psychologue);

// Route pour accéder au formulaire de soumission des données pour le psychologue
routerpsy.post("/formulaire", psycontroller.formulaire);

// Route pour accéder à la page de publication d'articles
routerpsy.get("/publication-articles", psycontroller.pagePublicationArticles);

// Route pour valider ou invalider les rendez-vous des patients
routerpsy.post("/valider-rendez-vous", psycontroller.validerRendezVous);


