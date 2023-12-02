import express, { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import { create_enc,delete_enc, get_encuesta, mostrar_encuestas } from "../controllers/encuestaController.js";


const router = express.Router();

router.post("/crear_encuesta", create_enc,checkAuth);
router.delete("/eliminar_encuesta/:id", delete_enc,checkAuth);
router.get("/mostrar_encuestas", mostrar_encuestas,checkAuth);
router.get("/mostrar_encuesta/:id",get_encuesta,checkAuth);

export default router;