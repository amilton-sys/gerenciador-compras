import { Product } from "./Product.js";
import { ProductService } from "./ProductService.js";
import { Validator } from "./Validator.js";

// Elementos do DOM
const elements = {
    nome: document.querySelector("#nome"),
    quantidade: document.querySelector("#quantidade"),
    valorUnitario: document.querySelector("#valorUnitario"),
    cadastrar: document.querySelector("#cadastrar"),
    limpar: document.querySelector("#limpar"),
    deleteTodos: document.querySelector("#deleteTodos"),
    ul: document.querySelector("ul"),
    valorTotal: document.querySelector("#valorTotal"),
};

// Serviço de produtos
const productService = new ProductService();
let isEditing = false; // Flag para controle do estado de edição
let currentProductId = null;

// Utilitários
const formatCurrency = value => `R$ ${value.toFixed(2).replace(".", ",")}`;
const clearFields = () => Object.values(elements).forEach(el => el.tagName === "INPUT" && (el.value = ""));
const generateId = () => Math.random().toString(36).substring(2, 9);

// Atualizar total
function updateTotal() {
    const total = productService.products.reduce((sum, product) => sum + product.total, 0);
    elements.valorTotal.textContent = formatCurrency(total);
}

// Renderizar produtos
function renderProducts() {
    elements.ul.innerHTML = "";
    productService.products.forEach(product => {
        const li = document.createElement("li");
        li.classList.add("flex", "center", "p-10");
        li.innerHTML = `
            <div class="card flex column p-10 gap-row">
                <div class="flex">
                    <label class="text fgrow-1">Nome</label>
                    <p class="text">${product.name}</p>
                </div>
                <div class="flex">
                    <label class="text fgrow-1">Quantidade</label>
                    <p class="text">${product.quantity}</p>
                </div>
                <div class="flex">
                    <label class="text fgrow-1">Valor unitário</label>
                    <p class="text">${formatCurrency(product.unitPrice)}</p>
                </div>
                <div class="flex">
                    <label class="text fgrow-1">Valor total</label>
                    <p class="text">${formatCurrency(product.total)}</p>
                </div>
                <div class="flex space-bet">
                    <button class="button editar" data-id="${product.id}">Editar</button>
                    <button class="button remover" data-id="${product.id}">Remover</button>
                </div>
            </div>
        `;
        elements.ul.appendChild(li);
    });
    updateTotal();
}

// Processar cadastro ou edição
function handleCadastro() {
    if (!Validator.validateFields([
        { field: elements.nome, message: "Nome é obrigatório" },
        { field: elements.quantidade, message: "Quantidade é obrigatória" },
        { field: elements.valorUnitario, message: "Valor unitário é obrigatório" },
    ])) return;

    const newProduct = new Product(
        currentProductId || generateId(),
        elements.nome.value,
        parseFloat(elements.quantidade.value),
        parseFloat(elements.valorUnitario.value.replace(",", "."))
    );

    if (isEditing) {
        productService.updateProduct(currentProductId, newProduct);
        isEditing = false;
        currentProductId = null;
        elements.cadastrar.textContent = "Cadastrar";
    } else {
        productService.addProduct(newProduct);
    }

    clearFields();
    renderProducts();
}

// Lidar com eventos no UL
function handleUlClick(event) {
    const id = event.target.dataset.id;
    if (!id) return;
    if (event.target.classList.contains("remover")) {
        productService.deleteProduct(id);
        renderProducts();
    } else if (event.target.classList.contains("editar")) {
        const product = productService.products.find(p => p.id === id);
        if (product) {
            elements.nome.value = product.name;
            elements.quantidade.value = product.quantity;
            elements.valorUnitario.value = product.unitPrice.toString().replace(".", ",");
            isEditing = true;
            currentProductId = id;
            elements.cadastrar.textContent = "Salvar";
        }
    }
}

// Eventos principais
elements.cadastrar.addEventListener("click", handleCadastro);
elements.limpar.addEventListener("click", clearFields);
elements.deleteTodos.addEventListener("click", () => {
    productService.clearAll();
    renderProducts();
});
elements.ul.addEventListener("click", handleUlClick);
document.addEventListener("DOMContentLoaded", renderProducts);



// Evita abrir o devtools
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

document.addEventListener("keydown", function(event) {
    if (event.key === "F12" || event.key === "I" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        window.location.href = "https://www.google.com";
    }
});




