import express, { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import { create_com,get_comentarios } from "../controllers/comentarioController.js";
const router = express.Router();

router.post("/crear_comentario/:id",checkAuth,create_com);
router.get("/get_comentarios/:id",checkAuth,get_comentarios)
export default router;