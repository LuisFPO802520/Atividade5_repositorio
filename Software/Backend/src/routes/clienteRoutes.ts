import { Router } from "express";
import { listarClientes, buscarCliente, cadastrarCliente } from "../controllers/clienteController";

const router = Router();
router.get("/", listarClientes);
router.get("/:id", buscarCliente);
router.post("/", cadastrarCliente);
export default router;