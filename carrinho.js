// ---------- FUNÇÕES ----------

// Atualiza subtotal e mostra na tela
function atualizarSubtotal() {
  const itens = document.querySelectorAll('.item-carrinho');
  let total = 0;
  itens.forEach(item => {
    let qtd = parseInt(item.querySelector('.quantidade').textContent);
    let preco = parseFloat(item.querySelector('.preco').textContent.replace(',', '.'));
    if (isNaN(qtd)) qtd = 1;
    if (isNaN(preco)) preco = 0;
    total += qtd * preco;
  });
  document.getElementById('total-valor').textContent = total.toFixed(2).replace('.', ',');
  return total;
}

// Salva itens no localStorage
function salvarCarrinho() {
  const itens = document.querySelectorAll('.item-carrinho');
  const carrinho = Array.from(itens).map(item => {
    let nome = item.querySelector('h3').textContent;
    let descricao = item.querySelector('p').textContent;
    let qtd = parseInt(item.querySelector('.quantidade').textContent);
    let preco = parseFloat(item.querySelector('.preco').textContent.replace(',', '.'));
    let img = item.querySelector('img').src;
    if (isNaN(qtd)) qtd = 1;
    if (isNaN(preco)) preco = 0;
    return { nome, descricao, qtd, preco, img };
  });
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  localStorage.setItem('totalCarrinho', atualizarSubtotal());
}

// Cria um item no carrinho (funciona para novos itens também)
function criarItemCarrinho(itemData) {
  const lista = document.querySelector('.lista-itens');
  
  // Checa se o item já existe, se sim só aumenta a quantidade
  const existente = Array.from(lista.querySelectorAll('.item-carrinho')).find(el => 
    el.querySelector('h3').textContent === itemData.nome
  );

  if (existente) {
    let qtdSpan = existente.querySelector('.quantidade');
    let novaQtd = parseInt(qtdSpan.textContent) + itemData.qtd;
    qtdSpan.textContent = novaQtd;
    atualizarSubtotal();
    salvarCarrinho();
    return;
  }

  const div = document.createElement('div');
  div.classList.add('item-carrinho');
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.marginBottom = "15px";
  div.innerHTML = `
    <img src="${itemData.img}" alt="${itemData.nome}" class="item-img" style="width:80px; height:80px; object-fit:cover; margin-right:10px;">
    <div class="item-info" style="flex:1">
      <h3>${itemData.nome}</h3>
      <p>${itemData.descricao}</p>
      <div class="quantidade-controls" style="display:flex; align-items:center; gap:5px; margin-top:5px;">
        <button class="menos">−</button>
        <span class="quantidade">${itemData.qtd}</span>
        <button class="mais">+</button>
      </div>
      <span class="preco">${itemData.preco.toFixed(2).replace('.', ',')}</span>
    </div>
  `;
  lista.appendChild(div);

  // Eventos de + e −
  const btnMais = div.querySelector('.mais');
  const btnMenos = div.querySelector('.menos');
  const qtdSpan = div.querySelector('.quantidade');

  btnMais.addEventListener('click', () => {
    let qtd = parseInt(qtdSpan.textContent) + 1;
    qtdSpan.textContent = qtd;
    atualizarSubtotal();
    salvarCarrinho();
  });

  btnMenos.addEventListener('click', () => {
    let qtd = parseInt(qtdSpan.textContent);
    if (qtd > 1) {
      qtdSpan.textContent = qtd - 1;
    } else {
      div.remove();
    }
    atualizarSubtotal();
    salvarCarrinho();
  });

  atualizarSubtotal();
  salvarCarrinho();
}

// Carrega carrinho do localStorage
function carregarCarrinho() {
  const carrinhoJSON = localStorage.getItem('carrinho');
  if (!carrinhoJSON) return;

  const carrinho = JSON.parse(carrinhoJSON);
  lista = document.querySelector('.lista-itens');
  lista.innerHTML = '<h2>Itens do Carrinho</h2>'; // limpa lista

  carrinho.forEach(item => {
    criarItemCarrinho(item);
  });
}

// Limpar carrinho
document.getElementById('bt-limpar').addEventListener('click', () => {
  if (confirm("Deseja realmente limpar o carrinho?")) {
    document.querySelectorAll('.item-carrinho').forEach(item => item.remove());
    document.getElementById('total-valor').textContent = '0,00';
    localStorage.removeItem('carrinho');
    localStorage.removeItem('totalCarrinho');
  }
});

// Finalizar pedido
document.getElementById('btn-finalizar').addEventListener('click', () => {
  salvarCarrinho();
  window.location.href = 'pagamento.html';
});

// Carregar carrinho ao abrir a página
document.addEventListener('DOMContentLoaded', () => {
  carregarCarrinho();
});
