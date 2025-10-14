let senhaAtual = "123";
const loginContainer = document.querySelector(".login-container");
const adminPanel = document.querySelector(".admin-panel");
const msgLogin = document.getElementById("msg-login");

let produtos = [
  {nome:"Drink de Abacaxi", descricao:"Refrescante drink tropical com abacaxi natural.", preco:15, quantidade:10, imagem:"Imagens/drink-de-abacaxi.jpeg"},
  {nome:"Drink de Cereja", descricao:"Doce e marcante, com licor de cereja.", preco:15, quantidade:10, imagem:"Imagens/Drink-cereja.jpeg"},
  {nome:"Drink Caveira de Cereja", descricao:"Servido em copo caveira, mistura gelada.", preco:18, quantidade:10, imagem:"Imagens/Drink-gela-cranio-de-cereja.jpeg"},
  {nome:"Drink de Uva", descricao:"Sabor marcante de uvas frescas.", preco:15, quantidade:10, imagem:"Imagens/drink-uva.jpeg"}
];

if(localStorage.getItem("produtos")){
  produtos = JSON.parse(localStorage.getItem("produtos"));
} else {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

document.getElementById("btn-login").addEventListener("click", () => {
  const senhaDigitada = document.getElementById("senha-admin").value;
  if(senhaDigitada === senhaAtual){
    loginContainer.style.display = "none";
    adminPanel.style.display = "block";
    renderizarProdutos();
  } else {
    msgLogin.textContent = "Senha incorreta!";
    msgLogin.style.color = "red";
  }
});

document.getElementById("btn-reset").addEventListener("click", () => {
  const novaSenha = prompt("Digite a nova senha:");
  if(novaSenha){
    senhaAtual = novaSenha;
    alert("Senha alterada com sucesso!");
  }
});

document.getElementById("btn-add-produto").addEventListener("click", () => {
  const nome = document.getElementById("nome-produto").value;
  const descricao = document.getElementById("descricao-produto").value;
  const preco = parseFloat(document.getElementById("preco-produto").value);
  const quantidade = parseInt(document.getElementById("quantidade-produto").value);
  const imagem = document.getElementById("imagem-produto").value;

  if(nome && descricao && preco && quantidade && imagem){
    produtos.push({nome, descricao, preco, quantidade, imagem});
    localStorage.setItem("produtos", JSON.stringify(produtos));
    limparCampos();
    renderizarProdutos();
  } else {
    alert("Preencha todos os campos!");
  }
});

function renderizarProdutos(){
  const tbody = document.querySelector("#tabela-produtos tbody");
  tbody.innerHTML = "";
  produtos.forEach((produto, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${produto.imagem}" alt="${produto.nome}"></td>
      <td>${produto.nome}</td>
      <td>${produto.descricao}</td>
      <td>R$ ${produto.preco.toFixed(2)}</td>
      <td>${produto.quantidade}</td>
      <td>
        <button onclick="editarProduto(${index})">Editar</button>
        <button onclick="deletarProduto(${index})">Deletar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function limparCampos(){
  document.getElementById("nome-produto").value = "";
  document.getElementById("descricao-produto").value = "";
  document.getElementById("preco-produto").value = "";
  document.getElementById("quantidade-produto").value = "";
  document.getElementById("imagem-produto").value = "";
}

function deletarProduto(index){
  if(confirm("Deseja deletar este produto?")){
    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    renderizarProdutos();
  }
}

function editarProduto(index){
  const produto = produtos[index];
  const nome = prompt("Editar nome:", produto.nome);
  const descricao = prompt("Editar descrição:", produto.descricao);
  const preco = parseFloat(prompt("Editar preço:", produto.preco));
  const quantidade = parseInt(prompt("Editar quantidade:", produto.quantidade));
  const imagem = prompt("Editar caminho da imagem:", produto.imagem);

  if(nome && descricao && !isNaN(preco) && !isNaN(quantidade) && imagem){
    produtos[index] = {nome, descricao, preco, quantidade, imagem};
    localStorage.setItem("produtos", JSON.stringify(produtos));
    renderizarProdutos();
  }
}

renderizarProdutos();
