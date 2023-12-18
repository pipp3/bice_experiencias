import express, { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";

import {
  report,mis_reportes,get_reportes,responder
} from "../controllers/reporteController.js";

import { checkToken } from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/reportar", report,checkToken);
router.get("/mis-reportes",checkAuth,mis_reportes)
router.get("/reportes-no-revisados",checkAuth,get_reportes)
router.post("/responder/:id",checkAuth,responder)

export default router;