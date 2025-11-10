import { Request, Response } from "express";
import prisma from "../prismaClient";

export const listarProdutos = async (_: Request, res: Response) => {
  try {
    const produtos = await prisma.produto.findMany({
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { id: "asc" },
    });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar produtos" });
  }
};

export const buscarProduto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const produto = await prisma.produto.findUnique({ where: { id } });
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
  } catch {
    res.status(500).json({ erro: "Erro ao buscar produto" });
  }
};

export const criarProduto = async (req: Request, res: Response) => {
  const { nome, valor, imagem, quantity, userId, status } = req.body;
  if (!nome || !valor || !userId)
    return res.status(400).json({ erro: "Campos obrigatórios ausentes" });

  try {
    const produto = await prisma.produto.create({
      data: {
        nome,
        valor: valor.toString(),
        imagem,
        quantity: Number(quantity ?? 0),
        userId: Number(userId),
        status: status || "pendente",
      },
    });
    res.json(produto);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar produto" });
  }
};

export const atualizarProduto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, valor, imagem, quantity, status } = req.body;

  try {
    const produto = await prisma.produto.update({
      where: { id },
      data: {
        nome,
        valor: valor !== undefined ? valor.toString() : undefined,
        imagem,
        quantity: quantity !== undefined ? Number(quantity) : undefined,
        status,
      },
    });
    res.json(produto);
  } catch {
    res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
};
export const deletarProduto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.produto.delete({ where: { id } });
    res.json({ mensagem: "Produto deletado com sucesso" });
  } catch {
    res.status(500).json({ erro: "Erro ao deletar produto" });
  }
};