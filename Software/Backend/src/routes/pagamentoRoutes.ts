import { Router } from "express";
import { criarPagamento, buscarStatusPagamento } from "../controllers/pagamentoController";

const router = Router();
router.post("/", criarPagamento);
router.get("/:id", buscarStatusPagamento);
export default router;