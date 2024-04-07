import { psychologues } from "../../model/psy/psy.js";
import { Patients } from "../../model/patients/patients.js";
import { rdv } from "../../model/rdv/rdv.js";
import { Articles } from "../../model/article/article.js";
import { Administrateurs } from "../../model/admin/admin.js";
import { dirname } from "node:path";

export const admin = {
  admin: (req, res) => {
     res.sendFile("../view/admin/admin.html", { root: dirname("view") });
      root: dirname("")
    
  },

  //creer un administratreur
  addAdmin: async (req, res) => {
    let {name,email,password,phoneNumber}=req.body;
   try{
       await Administrateurs.create({ name, email, password, phoneNumber });
       res.json('Administrateur ajouter avec succes');
   }catch(e){res.status(500).json({ error: "Erreur serveur" });}
},
    
  

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      let admins = await Administrateurs.getAllAdmin();
      for (let i of admins) {
        if (i.email === email && i.password === password) {
          req.session.user = i;
          return res.status(200).json({ message: "Connexion spéciale!", user: i });
        }
      }
      return res.status(400).json({ message: "Email ou mot de passe incorrect!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  },

  logout: (req, res) => {
    delete req.session.admin;
    res.redirect("/admin");
  },

  

  createPsychologist: async (req, res) => {
    let newPsy = req.body;
    newPsy.dateInscription = Date.now();
    newPsy.etat = "En attente";
    newPsy.role = "psychologue";
    try {
      const psy = await psychologues.addPsychologue(newPsy);
      res.status(201).json(psy);
    } catch (err) {
      console.log(err);
      res.status(500).json({ err });
    }
  },

  getAllPsychologists: async (req, res) => {
    try {
      const psys = await psychologues.getAllPsychologues();
      res.status(200).json(psys);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  },

  searchPsychologue: async (req, res) => {
    let critere = req.query;
    try {
      const resultats = await psychologues.searchPsychologue(critere);
      if (!resultats) {
        return res.status(404).send("Aucun psychologue trouvé");
      }
      res.status(200).json(resultats);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  validerpsychologue: async (req, res) => {
    const { psychologueId, action } = req.body;

    try {
      if (!req.session.admin) {
        return res.status(401).json({
          message: "Vous devez être connecté en tant qu'administrateur",
        });
      }

      const psychologue = await psychologues.getOnePsychologueById(
        psychologueId
      );

      if (!psychologue) {
        return res.status(404).json({ message: "Psychologue non trouvé" });
      }

      if (action === "valider") {
        await Administrateurs.approuverPsychologue(psychologueId);
        return res
          .status(200)
          .json({ message: "Psychologue approuvé avec succès" });
      } else if (action === "desapprouver") {
        await Administrateurs.desapprouverPsychologue(psychologueId);
        return res
          .status(200)
          .json({ message: "Psychologue désapprouvé avec succès" });
      } else {
        return res.status(400).json({ message: "Action invalide" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Une erreur s'est produite lors de la validation ou de la désapprobation du psychologue",
      });
    }
  },

  supprimerpsychologue: async (req, res) => {
    const { id } = req.params;

    try {
      if (!req.session.admin) {
        return res.status(401).json({
          message: "Vous devez être connecté en tant que administrateur",
        });
      }

      const resultat = await psychologues.deletePsyById(id);

      if (resultat.affectedRows > 0) {
        return res
          .status(200)
          .json({ message: "Le psychologue a été supprimé avec succès" });
      } else {
        return res
          .status(500)
          .json({ message: "Impossible de supprimer ce psychologue" });
      }
    } catch (error) {
      console.log("Erreur : ", error);
    }
  },

  showAllRdv: async (req, res) => {
    let rdvs = await rdv.getAllRDV();
    res.status(200).send(rdvs);
  },

  showArticles: async (req, res) => {
    let articles = await Articles.getAllArticle();
    res.render("back/articles", { articles: articles });
  },

  delArticle: (req, res) => {
    let id = req.body.id;
    console.log(id);
    if (!id) {
      return res.redirect("/admin/articles");
    }
    Articles.supArticle(id)
      .then((data) => {
        res.redirect("/admin/articles");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  showPatients: async (req, res) => {
    let patients = await Patients.getAllPatient();
    res.sendFile("view/article.html", { root: "views/" });
  },
};
