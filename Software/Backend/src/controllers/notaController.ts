import { Request, Response } from "express";

export const gerarNota = async (req: Request, res: Response) => {
  const { pedidoId } = req.body;
  if (!pedidoId) return res.status(400).json({ erro: "pedidoId ausente" });

  // Aqui você pode gerar PDF ou JSON (mock por enquanto)
  res.json({
    notaId: Date.now(),
    pedidoId,
    status: "gerada",
    data: new Date(),
  });
};

export const listarNotas = async (_: Request, res: Response) => {
  // Retornar notas do banco (mock no momento)
  res.json([{ notaId: 1, pedidoId: 42, status: "gerada" }]);
};