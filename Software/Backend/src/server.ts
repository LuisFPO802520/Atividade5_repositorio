// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// rotas (importar o router que exporta Router)
import authRoutes from "./routes/authRoutes";
import produtoRoutes from "./routes/produtoRoutes";
import clienteRoutes from "./routes/clienteRoutes";
import pagamentoRoutes from "./routes/pagamentoRoutes";
import notaRoutes from "./routes/notaRoutes";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// request logger (mostra método + caminho)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} → ${req.method} ${req.path}`);
  next();
});

// monta rotas
app.use("/auth", authRoutes);
app.use("/produtos", produtoRoutes);
app.use("/clientes", clienteRoutes);
app.use("/pagamentos", pagamentoRoutes);
app.use("/notas", notaRoutes);

console.log("Conectando ao banco:", process.env.DATABASE_URL);

const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
