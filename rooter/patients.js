import expres from "express";
import{patients} from "../controllers/patients/patients.js";

export const routerpatient = expres.Router();

//route pour la page d'accueil des patients
routerpatient.get("/", patients.accueil);


//Ajouter un patient
routerpatient.post('/addpatient',(req, res) => {
    res.send(req.body);
}); 
// routerpatient.post("/", async (req, res) => {
//     try {
//     await Patients.addPatient(req, res);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }


// });


// //recupere le patient par son id 
// routerpatient.get('/:id', patients.getPatientById)

// //recuperer un patient par son email et son mot de passe
// routerpatient.post('/login', patients.getByEmailAndPassword)

// //modifier un patient en fonction de son id
// routerpatient.put('/:id', patients.updatePatient)
