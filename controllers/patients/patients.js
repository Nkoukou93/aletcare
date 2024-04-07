import { dirname } from "path";
import {Patients} from "../../model/patients/patients.js";
import {rdv} from "../../model/rdv/rdv.js";
import { psychologues } from "../../model/psy/psy.js";

export const patients = {
  accueil: (req, res) => {
    res.sendFile("view/index.html", { root: __dirname + "/" });
  },
  login: async (req, res) => {
    let { email, password } = req.body;
    try {
      const data = await Patients.getByEmailAndPassword(email, password);
      if (!data) {
        return res
          .status(400)
          .json({ message: "Email ou mot de passe incorrect!" });
      } else {
        req.session.user = data[0]; //on stocke l'objet patient dans la session
        console.log("User connected :", req.session.user);
        return res.json({
          user: req.session.user,
          message: "Connexion réussie!",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  },
  // s'enregistrer en tant que patient
  connexion: async (req, res) => {
    let { name, email, password, dateOfBirth, phoneNumber } = req.body;
    try {
      await Patients.addPatient(
        name,
        email,
        password,
        dateOfBirth,
        phoneNumber
      );
      // res.redirect("/");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
  logout: (req, res) => {
    delete req.session.user; //On supprime le user de la session
    res.json({ user: null, message: "Déconnexion réussie !" });
  },
  //prendre rdv
  takeRdv: async (req, res) => {
    let { libelle, dateRdv, psychologue } = req.body;
    try {
      libelle = await rdv.checkLib(libelle); //verification
      dateRdv = new Date(dateRdv); //formatage de la date
      psychologue = req.session.user._id; //ajoute l'id du psychologue qui prend en charge ce RdV
      let resultat = await rdv.addRDV(libelle, dateRdv, psychologue); //ajouter au BDD
      res.json(resultat); //renvoyer les infos à l'utilisateur
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error });
    }
  },
  //afficher tous mes rendez-vous
  myAppointments: async (req, res) => {
    let id = req.session.user._id;
    let allAppointments = await rdv.getRDVPatient(id);
    res.json(allAppointments);
  },
  //supprimer un Rdv
  delAppointment: async (req, res) => {
    let id_rdv = req.params.id;
    try {
      await rdv.deleteRDV(id_rdv);
      res.json({ message: "Le Rendez-vous a été Supprimé!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Impossible de Supprimer ce Rendez-vous" });
    }
  },
  //Modifier un Rdv
  updateAppointment: async (req, res) => {
    const id_rdv = req.params.id;
    const data = req.body;
    if (!data || !Object.keys(data).length)
      return res.status(400).send("Please fill all fields");
    try {
      let updatedAppointment = await rdv.updateRDV(id_rdv, data);
      res.json(updatedAppointment);
    } catch (e) {
      res.status(400).json({ Error: e });
    }
  },
  //Acceder au dashboard du patients
  patientDashboard: async (req, res) => {
    try {
      const userId = req.session.user._id;
      const [appointments, allPsychologues, patientInfo] = await Promise.all([
        rdv.getRDVPatient(userId),
        psychologues.getAllPsychologues(),
        Patients.getOne(userId),
      ]);
      const nbRdvEnAttente = appointments.filter(
        (appointment) => appointment.etat == "en attente"
      ).length;
      const nbRdvConfirmes = appointments.filter(
        (appointment) => appointment.etat == "confirmé"
      ).length;
      const nbRdvAnnules = appointments.filter(
        (appointment) => appointment.etat == "annulé"
      ).length;
      res.render("dashboard", {
        title: "Mon Dashboard",
        role: "patient",
        nom: patientInfo.nom,
        email: patientInfo.email,
        telephone: patientInfo.phoneNumber,
        nbRdvEnAttente: nbRdvEnAttente,
        nbRdvConfirmes: nbRdvConfirmes,
        nbRdvAnnules: nbRdvAnnules,
        messageSuccess: req.flash("messageSuccess"),
        messageError: req.flash("messageError"),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors du chargement du tableau de bord du patient.",
      });
    }
  },
};
