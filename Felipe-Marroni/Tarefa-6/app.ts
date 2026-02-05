import express from 'express';
import type { Request, Response } from 'express';


interface Item {
  id: number;
  nome: string;
  preco: number;
}

let itens: Item[] = [ {id: 1, nome: "Maça", preco: 1.25},
  {id: 2, nome: "Banana", preco: 0.90},
  {id: 3, nome: "Laranja", preco: 1.10} ];
let nextId = 1;


const app = express();
app.use(express.json());

// Rotas CRUD

// GET /itens → listar todos
app.get("/itens", (req: Request, res: Response) => {
  res.json(itens);
});

// GET /itens/:id → buscar por id
app.get("/itens/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = itens.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item não encontrado" });
  }

  res.json(item);
});

// POST /itens → criar item
app.post("/itens", (req: Request, res: Response) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    res.status(400).json({ message: "Sem nome ou preco" });
    return;
  }

  const novoItem: Item = {
    id: nextId++,
    nome: nome,
    preco: preco
  };

  itens.push(novoItem);
  res.status(201).json(novoItem);
});

// PUT /itens/:id → atualizar item
app.put("/itens/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = itens.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item não encontrado" });
  }

  const { nome, preco } = req.body;

  if (nome !== undefined) item.nome = nome;
  if (preco !== undefined) item.preco = preco;

  res.json(item);
});

// DELETE /itens/:id → remover item
app.delete("/itens/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = itens.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item não encontrado" });
  }

  itens.splice(index, 1);
  res.status(204).send();
});

// Incializar servidor

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});