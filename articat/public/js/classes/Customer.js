export default class Customer {

    constructor(name, surname, shippingAddress, moneyBalance = 0, email, phoneNumber, purchases = []) {
        this.name = name
        this.surname = surname
        this.shippingAddress = shippingAddress
        this.moneyBalance = moneyBalance
        this.email = email
        this.phoneNumber = phoneNumber
        this.purchases = purchases
    }

}