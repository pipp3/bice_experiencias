import express, { Router } from "express";

const router = express.Router();

import {
  registrar,
} from "../controllers/usuarioController.js";



//Creacion, registro y confirmacion de usuario

router.post("/", registrar);




export default router;
