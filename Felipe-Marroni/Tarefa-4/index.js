import express from 'express';

const express = require('express');
const app = express();

// Array em memória
let itens = [ {id: 1, nome: "Maça", preco: 1.25},
  {id: 2, nome: "Banana", preco: 0.90},
  {id: 3, nome: "Laranja", preco: 1.10} ];



/* POST /itens */
app.post('/itens', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || preco == null) {
    return res.status(400).json({ error: 'Nome e Preço são necessários' });
  }

  const item = {
    id: itens.length + 1,
    nome,
    preco,
  };

  itens.push(item);
  res.status(201).json(item);
});

/* READ itens */
app.get('/itens', (req, res) => {
  res.json(itens);
});

/* GET /itens/:id */
app.get('/itens/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = itens.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  res.json(item);
});

/* PUT /itens/:id */
app.put('/itens/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = itens.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  const { nome, preco } = req.body;

  if (nome !== undefined) item.nome = nome;
  if (preco !== undefined) item.preco = preco;

  res.json(item);
});

/* DELETE /itens/:id */
app.delete('/itens/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = itens.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  const deletedItem = itens.splice(index, 1)[0];
  res.json(deletedItem);
});

// Rodar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`REST API na URI http://localhost:${PORT}`);
});
