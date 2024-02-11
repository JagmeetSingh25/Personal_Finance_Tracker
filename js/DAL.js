const ExpenseTable = {
    // Inserts a new expense into the database
    insert: (expenseObj) => {
        db.transaction((tx) => {
            const sql = "INSERT INTO expense(amount, category_id, date, description)" +
                "VALUES (?,?,?,?);";
            const options = [expenseObj.amount, expenseObj.category_id, expenseObj.date, expenseObj.description];
            tx.executeSql(sql, options, () => {
                console.info("Success: added new expense.");
            }, errorHandler);
        });
    },
    selectAll: (callback) => {
        db.transaction((tx) => {
            const sql = "SELECT * FROM expense;";
            const options = [];
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },
    select: (options, callback) => {
        db.transaction((tx) => {
            const sql = "SELECT * FROM expense WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },
    delete: (options) => {
        db.transaction((tx) => {
            const sql = "DELETE FROM expense WHERE id=?;";
            tx.executeSql(sql, options, () => {
                console.info("Success: Expense deleted.")
            }, errorHandler);
        });
    },
    update: (expenseObj, id) => {
        db.transaction((tx) => {
            const sql = "UPDATE expense SET amount=?, category_id=?, date=?, description=? WHERE id=?;";
            const options = [expenseObj.amount, expenseObj.category_id, expenseObj.date, expenseObj.description, id];
            tx.executeSql(sql, options, () => {
                console.info("Success: Expense updated.");
            }, errorHandler);
        });
    }

}

const IncomeTable = {
    // Inserts a new income log into the database
    insert: (incomeObj) => {
        db.transaction((tx) => {
            const sql = "INSERT INTO income(amount, source, date, description)" +
                "VALUES (?,?,?,?);";
            const options = [incomeObj.amount, incomeObj.source, incomeObj.date, incomeObj.description];
            tx.executeSql(sql, options, () => {
                console.info("Success: added new income.");
            }, errorHandler);
        });
    },
    selectAll: (callback) => {
        db.transaction((tx) => {
            const sql = "SELECT * FROM income;";
            const options = [];
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },
    select: (options, callback) => {
        db.transaction((tx) => {
            const sql = "SELECT * FROM income WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },
    delete: (options) => {
        db.transaction((tx) => {
            const sql = "DELETE FROM income WHERE id=?;";
            tx.executeSql(sql, options, () => {
                console.info("Success: Income deleted.")
            }, errorHandler);
        });
    },
    update: (incomeObj, id) => {
        db.transaction((tx) => {
            const sql = "UPDATE income SET amount=?, source=?, date=?, description=? WHERE id=?;";
            const options = [incomeObj.amount, incomeObj.source, incomeObj.date, incomeObj.description, id];
            tx.executeSql(sql, options, () => {
                console.info("Success: Income updated.");
            }, errorHandler);
        });
    }
}

const Category = {
    selectAll: (callback) => {
        db.transaction((tx) => {
            const sql = "SELECT * FROM category;";
            const options = [];
            tx.executeSql(sql, options, callback, errorHandler);
        });
    }
}

const SavingsTable = {
    // Inserts a new savings goal into the database
    insert: (goalObj) => {
        db.transaction((tx) => {
            const sql = "INSERT INTO savings(goal, amount)" +
                "VALUES (?,?);";
            const options = [goalObj.goal, goalObj.amount];
            tx.executeSql(sql, options, () => {
                console.info("Success: added new savings goal.");
            }, errorHandler);
        });
    },
    // Selects all savings goals from the database
    selectAll: (callback) => {
        db.transaction((tx) => {
            const sql = "SELECT * FROM savings;";
            const options = [];
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },
    // Selects a specific savings goal by ID
    select: (options, callback) => {
        db.transaction((tx) => {
            const sql = "SELECT * FROM savings WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },
    // Deletes a savings goal by ID
    delete: (options) => {
        db.transaction((tx) => {
            const sql = "DELETE FROM savings WHERE id=?;";
            tx.executeSql(sql, options, () => {
                console.info("Success: Savings goal deleted.")
            }, errorHandler);
        });
    },
    // Updates a savings goal by ID
    update: (goalObj, id) => {
        db.transaction((tx) => {
            const sql = "UPDATE savings SET goal=?, amount=? WHERE id=?;";
            const options = [goalObj.goal, goalObj.amount, id];
            tx.executeSql(sql, options, () => {
                console.info("Success: Savings goal updated.");
            }, errorHandler);
        });
    },
    selectById: (id, callback) => {
        db.transaction((tx) => {
            const sql = "SELECT * FROM savings WHERE id=?;";
            const options = [id];
            tx.executeSql(sql, options, (tx, results) => {
                if (results.rows.length > 0) {
                    const selectedGoal = results.rows.item(0);
                    callback(selectedGoal);
                } else {
                    callback(null); // Pass null if no goal found
                }
            }, errorHandler);
        });
    },
};
