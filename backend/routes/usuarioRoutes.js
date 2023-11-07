import express, { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

import {
  login,changePassword,forgetPassword,checkToken,profile
} from "../controllers/usuarioController.js";



//Creacion, registro y confirmacion de usuario

router.post("/",login);
router.get("/olvide-password/:token",checkToken);
router.post("/olvide-password",forgetPassword);
router.post("/olvide-password/:token",changePassword);
router.get("/perfil", checkAuth, profile);


export default router;
