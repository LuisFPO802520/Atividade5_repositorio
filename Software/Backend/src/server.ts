import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000'); //npx ts-node src/server.ts para rodar
});
