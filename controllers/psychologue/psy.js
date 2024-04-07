import {psychologues} from "../../model/psy/psy.js";
import { dirname } from "node:path";

 export const psycontroller = {
  psychologue: async (req, res) => {
    res.sendFile("view/psychologue.html", { root: dirname("view") });
  },
  // Se connecter pour remplir un formulaire dont les données seront envoyées à l'administrateur pour validation ou invalidation.
  formulaire: async (req, res) => {
    try {
      // Assurez-vous que le psychologue est connecté
      if (!req.session.psychologue) {
        return res.status(401).json({
          message: "Vous devez être connecté en tant que psychologue",
        });
      }

      // Remplir le formulaire et enregistrer les données dans la base de données
      const { name, email, specialite, profile, document } = req.body;
      if (!name || !email || !specialite || !profile || !document) {
        return res
          .status(400)
          .json({ message: "Veuillez remplir tous les champs du formulaire" });
      }

      const newPsy = await Psychologues.addPsychologue(
        name,
        email,
        specialite,
        profile,
        document
      );
      res.status(201).json({
        message: "Psychologue enregistré avec succès",
        psychologue: newPsy,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de l'enregistrement du psychologue",
      });
    }
  },

  // Se connecter pour accéder à la page pour publier des articles.
  pagePublicationArticles: async (req, res) => {
    try {
      // Assurez-vous que le psychologue est connecté
      if (!req.session.psychologue) {
        return res.status(401).json({
          message: "Vous devez être connecté en tant que psychologue",
        });
      }

      // Rendre la page pour publier des articles
      res.sendFile("view/PublicationArticles.html", {
        root: __dirname + "/../views/",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de l'accès à la page de publication des articles",
      });
    }
  },

  // Se connecter pour valider ou invalider les rendez-vous des patients.
  validerRendezVous: async (req, res) => {
    try {
      // Assurez-vous que le psychologue est connecté
      if (!req.session.psychologue) {
        return res.status(401).json({
          message: "Vous devez être connecté en tant que psychologue",
        });
      }

      // Logique pour valider ou invalider les rendez-vous
      // ...

      res.status(200).json({ message: "Rendez-vous validés avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la validation ou de l'invalidation des rendez-vous",
      });
    }
  },
};

