// Lista de produtos
const produtos = [
  { nome: "Drink de Abacaxi", preco: 19.90, categoria: "Drinks", img: "https://github.com/brendaguterres843-maker/card-pio_hello_sushi/blob/main/drink-de-abacaxi.jpeg", descricao: "Refrescante drink tropical com abacaxi natural e toque especial Hellkit." },
  { nome: "Drink de Cereja", preco: 21.50, categoria: "Drinks", img: "Imagens/Drink-cereja.jpeg", descricao: "Doce e marcante, com licor de cereja e finalização delicada." },
  { nome: "Drink Caveira de Cereja", preco: 25.00, categoria: "Drinks", img: "Imagens/Drink-gela-cranio-de-cereja.jpeg", descricao: "Servido em copo caveira, mistura gelada e intensa de cereja." },
  { nome: "Drink de Uva", preco: 18.00, categoria: "Drinks", img: "Imagens/drink-uva.jpeg", descricao: "Sabor marcante de uvas frescas, levemente adocicado e refrescante." },
  { nome: "Hot Roll de Atum", preco: 28.00, categoria: "Sushi", img: "Imagens/hot-roll-de-atum.jpeg", descricao: "Clássico empanado crocante recheado com atum e arroz temperado." },
  { nome: "Hot Roll de Salmão", preco: 30.00, categoria: "Sushi", img: "Imagens/hot-roll-de-salmão.jpeg", descricao: "Crocante por fora e macio por dentro, recheado com salmão fresco." },
  { nome: "Nigiri de Atum", preco: 16.50, categoria: "Sushi", img: "Imagens/nigiri-atum.jpeg", descricao: "Arroz moldado com fatia de atum fresco, delicado e saboroso." },
  { nome: "Nigiri de Camarão", preco: 17.00, categoria: "Sushi", img: "Imagens/nigiri-de-camarao.jpeg", descricao: "Arroz macio com camarão fresco, servido com delicadeza." },
  { nome: "Nigiri de Salmão", preco: 16.50, categoria: "Sushi", img: "Imagens/nigiri-de-salmao.jpeg", descricao: "Arroz com fatia de salmão fresco e delicioso molho especial." }
];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const menu = document.getElementById("menu-produtos");
const pesquisa = document.getElementById("pesquisa");
const btnCarrinho = document.getElementById("btn-carrinho");
const modalCarrinho = document.getElementById("modal-carrinho");
const itensCarrinho = document.getElementById("itens-carrinho");
const valorTotal = document.getElementById("valor-total");
const btnFecharCarrinho = document.getElementById("fechar-carrinho");
const btnFinalizarPedido = document.getElementById("finalizar-pedido");

// 🔹 Renderiza produtos
function mostrarProdutos(lista) {
  menu.innerHTML = "";
  lista.forEach((produto, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${produto.img}" alt="${produto.nome}">
      <h2>${produto.nome}</h2>
      <p>${produto.descricao}</p>
      <span class="price">R$ ${produto.preco.toFixed(2)}</span>
      <button onclick="adicionarAoCarrinho(${index})">Adicionar ao Carrinho</button>
    `;
    menu.appendChild(card);
  });
}

// 🔹 Filtros
document.querySelectorAll(".btn-filtro").forEach(btn => {
  btn.addEventListener("click", () => {
    const categoria = btn.dataset.categoria;
    if (categoria === "Todos") mostrarProdutos(produtos);
    else mostrarProdutos(produtos.filter(p => p.categoria === categoria));
  });
});

// 🔹 Pesquisa
pesquisa.addEventListener("input", () => {
  const termo = pesquisa.value.toLowerCase();
  mostrarProdutos(produtos.filter(p => p.nome.toLowerCase().includes(termo)));
});

// 🔹 Atualizar carrinho
function atualizarCarrinho() {
  itensCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const qtd = item.qtd || 1;
    total += item.preco * qtd;

    const div = document.createElement("div");
    div.innerHTML = `
      ${item.nome} x ${qtd} - R$ ${(item.preco * qtd).toFixed(2)}
      <button onclick="removerDoCarrinho(${index})">❌</button>
    `;
    itensCarrinho.appendChild(div);
  });

  valorTotal.textContent = total.toFixed(2);
  document.getElementById("total-itens").textContent = carrinho.reduce((acc, i) => acc + (i.qtd || 1), 0);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// 🔹 Adicionar ao carrinho
function adicionarAoCarrinho(index) {
  const produto = produtos[index];
  const existente = carrinho.find(p => p.nome === produto.nome);
  if (existente) {
    existente.qtd = (existente.qtd || 1) + 1;
  } else {
    carrinho.push({ ...produto, qtd: 1 });
  }
  atualizarCarrinho();
}

// 🔹 Remover do carrinho
function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

// 🔹 Abrir/Fechar modal
btnCarrinho.addEventListener("click", () => {
  modalCarrinho.style.display = modalCarrinho.style.display === "block" ? "none" : "block";
});

btnFecharCarrinho.addEventListener("click", () => {
  modalCarrinho.style.display = "none";
});

// 🔹 Finalizar pedido → carrinho.html
btnFinalizarPedido.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  window.location.href = "carrinho.html";
});

// Inicializa
mostrarProdutos(produtos);
atualizarCarrinho();


