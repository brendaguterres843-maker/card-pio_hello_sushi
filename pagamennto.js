document.addEventListener("DOMContentLoaded", () => {
    // Buscar CEP
    document.getElementById("btn-buscar-cep").addEventListener("click", async () => {
        const cep = document.getElementById("cep").value.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    document.getElementById("rua").value = data.logradouro;
                    document.getElementById("bairro").value = data.bairro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("estado").value = data.uf;
                    document.getElementById("numero").disabled = false;
                } else {
                    alert("CEP não encontrado.");
                }
            } catch (err) {
                console.error(err);
                alert("Erro ao buscar CEP.");
            }
        } else {
            alert("CEP inválido.");
        }
    });

    // Alternar PIX / Cartão
    document.querySelectorAll('input[name="pagamento"]').forEach((input) => {
        input.addEventListener("change", () => {
            const isPix = input.value === "pix";
            document.getElementById("painel-pix").classList.toggle("hidden", !isPix);
            document.getElementById("painel-cartao").classList.toggle("hidden", isPix);
        });
    });

    // Timer PIX
    let tempo = 30;
    const timerEl = document.getElementById("timer");
    const interval = setInterval(() => {
        tempo--;
        timerEl.textContent = tempo;
        if (tempo <= 0) {
            clearInterval(interval);
            alert("Tempo expirado! Por favor, gere um novo pagamento.");
        }
    }, 1000);

    // Inserir QR Code do diretório
    const qrCodeDiv = document.getElementById("pix-qrcode");
    qrCodeDiv.innerHTML = '<img src="Imagens/qrcode.png" alt="QR Code PIX">'; // imagem do diretório Imagens/

    // Validar campos antes de finalizar
    const btnFinalizar = document.getElementById("btn-finalizar");
    btnFinalizar.addEventListener("click", () => {
        const cep = document.getElementById("cep").value.trim();
        const rua = document.getElementById("rua").value.trim();
        const bairro = document.getElementById("bairro").value.trim();
        const cidade = document.getElementById("cidade").value.trim();
        const estado = document.getElementById("estado").value.trim();
        const numero = document.getElementById("numero").value.trim();

        if (!cep || !rua || !bairro || !cidade || !estado || !numero) {
            alert("Preencha todos os campos do endereço antes de finalizar o pagamento!");
            return;
        }

        const pagamento = document.querySelector('input[name="pagamento"]:checked').value;

        if (pagamento === "cartao") {
            const nomeCartao = document.getElementById("nome-cartao").value.trim();
            const numeroCartao = document.getElementById("numero-cartao").value.trim();
            const validade = document.getElementById("validade").value.trim();
            const cvv = document.getElementById("cvv").value.trim();

            if (!nomeCartao || !numeroCartao || !validade || !cvv) {
                alert("Preencha todos os campos do cartão antes de finalizar o pagamento!");
                return;
            }
        }

        alert("Pagamento finalizado com sucesso!");
    });

    // Inicialização
    document.getElementById("painel-cartao").classList.add("hidden");
});
