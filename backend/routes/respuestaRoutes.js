import express, { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import { crear_respuesta } from "../controllers/respuestaController.js";
const router = express.Router();

router.post("/crear_respuesta/:id", checkAuth,crear_respuesta);




export default router;