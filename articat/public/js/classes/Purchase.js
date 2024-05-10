export default class Purchase {

    static counter = 0

    constructor(quantity, item, customer) {
        this.purchaseId = `P${++Purchase.counter}`
        this.quantity = quantity
        this.item = item
        this.customer = customer
    }

    getTotalPrice() {
        return this.quantity * this.item.price
    }

}