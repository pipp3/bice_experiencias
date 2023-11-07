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
<<<<<<< HEAD
router.post("/olvide-password/:token",changePassword);
=======
router.post("/olvide-password/:token",changePassword)

>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
router.get("/perfil", checkAuth, profile);


export default router;
