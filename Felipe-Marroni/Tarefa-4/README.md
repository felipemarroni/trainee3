## API DE ITENS DE LOJA – CRUD COM EXPRESS

API simples em Node.js + Express para gerenciar itens de uma loja.

## EXECUTAR O SERVIDOR

1. Instalar dependências:
npm install express


2. Iniciar o servidor:
node server.js


3. Acessar o servidor
http://localhost:3000

## APLICAÇÕES

1. CRIAR ITEM

curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Apple","price":1.25}'


2. LISTAR TODOS OS ITENS
curl http://localhost:3000/items


3. BUSCAR ITEM POR ID
curl http://localhost:3000/items/1


4. ATUALIZAR ITEM
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"price":1.50}'


5. DELETAR ITEM
curl -X DELETE http://localhost:3000/items/1

## OBSERVAÇÕES

Os dados são armazenados apenas em memória. Ao reiniciar o servidor, todos os itens são apagados