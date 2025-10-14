// Puxa carrinho do localStorage
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Renderiza detalhes do pedido
const detalhesPedido = document.getElementById('detalhes-pedido');
carrinho.forEach(item => {
  const li = document.createElement('li');
  li.textContent = `${item.nome} x ${item.qtd || 1}`;
  detalhesPedido.appendChild(li);
});

// Timer regressivo de entrega (30 min)
let tempo = 30 * 60;
const tempoElemento = document.getElementById('tempo-entrega');

function atualizarTimer() {
  const min = Math.floor(tempo / 60);
  const seg = tempo % 60;
  tempoElemento.textContent = `${min.toString().padStart(2,'0')}:${seg.toString().padStart(2,'0')}`;
  if (tempo > 0) tempo--;
}

setInterval(atualizarTimer, 1000);
atualizarTimer();

// Progressão automática do status
const steps = document.querySelectorAll('.step');
let statusIndex = 0;

function avancarStatus() {
  if (statusIndex < steps.length - 1) {
    steps[statusIndex + 1].classList.add('active');
    statusIndex++;
  }
}

setInterval(avancarStatus, 10000); // a cada 10s simula evolução
