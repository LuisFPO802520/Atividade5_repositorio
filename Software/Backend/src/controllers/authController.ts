import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// 🔹 Registro de usuário
export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;

    console.log("📩 Dados recebidos no register:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Nome, e-mail e senha são obrigatórios." });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "cliente",
      },
    });

    res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (err) {
    console.error("❌ Erro no register:", err);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
}

// 🔹 Login
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    console.log("📩 Dados recebidos no login:", req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login bem-sucedido",
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("❌ Erro no login:", err);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
}
