import express, { Router } from "express";

import { create_foro,delete_foro,mostrar_foros,edit_foro,get_foro} from "../controllers/foroController.js";
import checkAuth from "../middleware/checkAuth.js";
import { checkToken } from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/crear_foro",checkAuth,create_foro);
router.delete("/eliminar_foro/:id",checkAuth,delete_foro);
router.get("/mis_foros",checkAuth,mostrar_foros);
router.put("/editar_foro/:id",checkAuth,edit_foro);
router.get("/obtener_foro/:id",checkAuth,get_foro);




export default router