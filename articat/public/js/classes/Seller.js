export default class Seller {

    constructor(companyName, bankAccount, items = []) {
        this.companyName = companyName
        this.bankAccount = bankAccount
        this.items = items
    }

}