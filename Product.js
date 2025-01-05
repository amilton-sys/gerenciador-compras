export class Product {
    constructor(id, name, quantity, unitPrice) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.total = this.calculateTotal();
    }

    calculateTotal() {
        return this.quantity * this.unitPrice;
    }
}
