const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

const produtosPath = path.join(__dirname, 'data/produtos.json');

function lerProdutos() {
  if (!fs.existsSync(produtosPath)) {
    fs.writeFileSync(produtosPath, JSON.stringify([]));
  }
  const data = fs.readFileSync(produtosPath);
  return JSON.parse(data);
}

function salvarProdutos(produtos) {
  fs.writeFileSync(produtosPath, JSON.stringify(produtos, null, 2));
}

app.get('/api/produtos', (req, res) => {
  const produtos = lerProdutos();
  res.json(produtos);
});

app.post('/api/produtos', (req, res) => {
  const produtos = lerProdutos();
  produtos.push(req.body);
  salvarProdutos(produtos);
  res.json({ success: true });
});

app.put('/api/produtos/:index', (req, res) => {
  const produtos = lerProdutos();
  const idx = parseInt(req.params.index);
  produtos[idx] = req.body;
  salvarProdutos(produtos);
  res.json({ success: true });
});

app.delete('/api/produtos/:index', (req, res) => {
  const produtos = lerProdutos();
  const idx = parseInt(req.params.index);
  produtos.splice(idx, 1);
  salvarProdutos(produtos);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
