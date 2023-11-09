import express, { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";

import {
  delete_user,create_user,edit_user
} from "../controllers/adminController.js";
import { checkToken } from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/eliminar_usuario", delete_user,checkAuth);
router.post("/crear_usuario", create_user,checkToken);
router.post("/editar_usuario", edit_user,checkToken);


export default router