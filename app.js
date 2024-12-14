const valorTotal = document.querySelector("#valorTotal");
const nome = document.querySelector("#nome");
const quantidade = document.querySelector("#quantidade");
const valorUnitario = document.querySelector("#valorUnitario");
const cadastrar = document.querySelector("#cadastrar");
const limpar = document.querySelector('#limpar');
const deleteTodos = document.querySelector('#deleteTodos');
const listaProdutos = JSON.parse(localStorage.getItem('produtos')) || [];

// Exibe ou atualiza a mensagem de erro
function mostrarErro(campo, mensagem) {
    let erro = campo.nextElementSibling;
    if (!erro || !erro.classList.contains('erro')) {
        erro = document.createElement('p');
        erro.classList.add('erro');
        campo.parentNode.appendChild(erro);
    }
    erro.textContent = mensagem;
}

// Remove a mensagem de erro
function limparErro(campo) {
    const erro = campo.nextElementSibling;
    if (erro && erro.classList.contains('erro')) {
        erro.textContent = '';
    }
}

function cadastrarProduto() {
    let valido = true;

    // Valida o campo "nome"
    if (!nome.value.trim()) {
        mostrarErro(nome, 'Nome é obrigatório');
        valido = false;
    } else {
        limparErro(nome);
    }

    // Valida o campo "quantidade"
    const quantidadeValor = parseFloat(quantidade.value);
    if (!quantidade.value.trim() || isNaN(quantidadeValor) || quantidadeValor <= 0) {
        mostrarErro(quantidade, 'Quantidade deve ser um número válido maior que zero');
        valido = false;
    } else {
        limparErro(quantidade);
    }

    // Valida o campo "valorUnitario"
    let valorUnitarioValor = valorUnitario.value.trim().replace(',', '.'); // Troca vírgula por ponto
    valorUnitarioValor = parseFloat(valorUnitarioValor);
    if (!valorUnitario.value.trim() || isNaN(valorUnitarioValor) || valorUnitarioValor <= 0) {
        mostrarErro(valorUnitario, 'Valor unitário deve ser um número válido maior que zero');
        valido = false;
    } else {
        limparErro(valorUnitario);
    }

    if (!valido) return;

    // Cria o objeto do produto com parseFloat para garantir que a quantidade e valor unitário sejam tratados corretamente
    const produto = {
        nome: nome.value,
        quantidade: quantidadeValor,
        valorUnitario: valorUnitarioValor,
        total: quantidadeValor * valorUnitarioValor // Calcula o total com precisão decimal
    };

    listaProdutos.push(produto);
    atualizarLocalStorage();
    limparCampos();
    carregaProdutos();
}

// Atualiza o localStorage
function atualizarLocalStorage() {
    localStorage.setItem('produtos', JSON.stringify(listaProdutos));
}

// Limpa os campos do formulário
function limparCampos() {
    nome.value = '';
    quantidade.value = '';
    valorUnitario.value = '';
}

function carregaProdutos() {
    const ul = document.querySelector('ul');
    ul.innerHTML = '';
    listaProdutos.forEach((produto, index) => {
        const li = document.createElement('li');
        li.classList.add('flex', 'center', 'p-10');

        li.innerHTML = `
            <div class="card flex column p-10 gap-row">
                <div class="flex">
                    <label class="text fgrow-1">Nome</label>
                    <p class="text">${produto.nome}</p>
                </div>
                <div class="flex">
                    <label class="text fgrow-1">Quantidade</label>
                    <p class="text">${produto.quantidade}</p> <!-- Exibe a quantidade com 2 casas decimais -->
                </div>
                <div class="flex">
                    <label class="text fgrow-1">Valor unitário</label>
                    <p class="text">R$ ${produto.valorUnitario.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="flex">
                    <label class="text fgrow-1">Valor total</label>
                    <p class="text">R$ ${produto.total.toFixed(2).replace('.', ',')}</p> <!-- Exibe o total com 2 casas decimais -->
                </div>
                <button class="button remover" onclick="removerProduto(${index})">Remover</button>
            </div>
        `;
        ul.appendChild(li);
    });
    calculaTotal();
}

// Torna removerProduto disponível globalmente
window.removerProduto = function(index) {
    listaProdutos.splice(index, 1);
    atualizarLocalStorage();
    carregaProdutos();
};

function calculaTotal() {
    const total = listaProdutos.reduce((soma, produto) => soma + produto.total, 0);
    valorTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`; // Exibe o total final com 2 casas decimais
}

function deletarTodos(){
    localStorage.clear();
    window.location.reload(true);
}

cadastrar.addEventListener('click', cadastrarProduto);
limpar.addEventListener('click', limparCampos);
document.addEventListener('DOMContentLoaded', carregaProdutos);
deleteTodos.addEventListener('click', deletarTodos);
