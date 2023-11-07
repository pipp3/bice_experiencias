import express, { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";

import {
  report
} from "../controllers/reporteController.js";

import { checkToken } from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/reportar", report,checkToken);

export default router;