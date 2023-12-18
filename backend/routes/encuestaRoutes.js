import express, { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import { create_enc,delete_enc, get_encuesta, mostrar_encuestas, publicar_encuesta,encuestas_disponibles,resultados } from "../controllers/encuestaController.js";


const router = express.Router();

router.post("/crear_encuesta", checkAuth,create_enc);
router.delete("/eliminar_encuesta/:id",checkAuth, delete_enc);
router.get("/mostrar_encuestas",checkAuth, mostrar_encuestas);
router.get("/mostrar_encuesta/:id",checkAuth,get_encuesta);
router.post("/publicar/:id",checkAuth,publicar_encuesta)
router.get("/disponibles",checkAuth,encuestas_disponibles)
router.get("/resultados/:id",checkAuth,resultados)

export default router;