export default class Item {

    static counter = 0

    constructor(name, category, image, price, quantity, description, seller) {
        this.itemId = `I${++Item.counter}`
        this.name = name
        this.category = category
        this.image = image
        this.price = price
        this.quantity = quantity
        this.description = description
        this.seller = seller
    }

    isAvailable() {
        return this.quantity > 0
    }

}