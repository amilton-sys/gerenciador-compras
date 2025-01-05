export class ProductService {
    constructor(storageKey = "products") {
        this.storageKey = storageKey;
        this.products = this.loadProducts();
    }

    loadProducts() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    saveProducts() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.products));
    }

    addProduct(product) {
        this.products.unshift(product);
        this.saveProducts();
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = updatedProduct;
            this.saveProducts();
        }
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveProducts();
    }

    clearAll() {
        this.products = [];
        localStorage.removeItem(this.storageKey);
    }
}
