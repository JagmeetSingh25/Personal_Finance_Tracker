class Expense {
    constructor(amount, category_id, date, description = "") {
        this.amount = amount;
        this.category_id = category_id;
        this.date = date;
        this.description = description
    }
}