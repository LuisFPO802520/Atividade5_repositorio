import { Router } from "express";
import { gerarNota, listarNotas } from "../controllers/notaController";

const router = Router();
router.post("/", gerarNota);
router.get("/", listarNotas);
export default router;