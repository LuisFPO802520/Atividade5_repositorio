import { Request, Response } from "express";
import prisma from "../prismaClient";

export const listarClientes = async (_: Request, res: Response) => {
  try {
    const clientes = await prisma.user.findMany({
      where: { role: "cliente" },
      orderBy: { id: "asc" },
    });
    res.json(clientes);
  } catch {
    res.status(500).json({ erro: "Erro ao listar clientes" });
  }
};

export const buscarCliente = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const cliente = await prisma.user.findUnique({ where: { id } });
    if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado" });
    res.json(cliente);
  } catch {
    res.status(500).json({ erro: "Erro ao buscar cliente" });
  }
};

export const cadastrarCliente = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ erro: "Campos obrigatórios ausentes" });

  try {
    const cliente = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: role || "cliente",
      },
    });
    res.json(cliente);
  } catch {
    res.status(500).json({ erro: "Erro ao cadastrar cliente" });
  }
};