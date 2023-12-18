import express, { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import { create_question } from "../controllers/preguntaController.js";


const router = express.Router();

router.post("/crear_pregunta/:id", checkAuth,create_question);


export default router;