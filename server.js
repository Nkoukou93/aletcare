import dotenv from "dotenv"
import session from "express-session"
import {createServer} from 'http';
import express from "express"
import{RouterAdm} from "./rooter/admin.root.js"
import { routerpsy } from "./rooter/psy.root.js";
import { routerpatient } from "./rooter/patients.js";
dotenv.config()


const App = express()
const Port = process.env.NODE_ENV || 6000

const Server = createServer(App)

App.use(express.static('public'))
App.use(express.urlencoded({extended: true}))
App.use(express.json())
App.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // need to set this to true in order to work with https
}))

App.use("/admin", RouterAdm);
App.use("/psy", routerpsy);
App.use("/patient", routerpatient);


Server.listen(Port,()=>{console.log(`serveur est bien demarre au port ${Port}`);})