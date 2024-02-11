let db;

// Handles Sql errors
function errorHandler(tx, error) {
    console.error("SQl Error: " + error.message);
}

let DB = {
    // creates the database
    createDatabase: () => {
        const shortName = "PFTDB";
        const version = "1.0";
        const displayName = "DB for Personal Finance Tracker";
        const dbSize = 2 * 1024 * 1024;

        db = openDatabase(shortName, version, displayName, dbSize, () => {
            console.info("Success: Database created successfully.");
        });
    },
    createTables: () => {
        // Drops category table
        db.transaction((tx) => {
            const sql = "DROP TABLE IF EXISTS category;";
            const options = [];
            tx.executeSql(sql, options, () => {
                console.info("Success: category table dropped.");
            }, errorHandler);
        });
        db.transaction((tx) => {
            const dropTableSql = "DROP TABLE IF EXISTS savings;";
            const options = [];
            tx.executeSql(dropTableSql, options, () => {
                console.info("Success: savings table dropped.");
            }, errorHandler);
        });
        // Creates category table
        db.transaction((tx) => {
            const sql = "CREATE TABLE IF NOT EXISTS category(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(30) NOT NULL);";
            const options = [];
            tx.executeSql(sql, options, () => {
                DB.seedTables();
                console.info("Success: category table created.");
            }, errorHandler);
        });
        // Creates Income Tables
        db.transaction((tx) => {
            const createTableSql = "CREATE TABLE IF NOT EXISTS income(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "source TEXT NOT NULL," +
                "date DATE NOT NULL," +
                "amount DECIMAL(10, 2) NOT NULL," +
                "description TEXT);";

            // Execute the CREATE TABLE query
            tx.executeSql(createTableSql, [], () => {
                console.info("Success: income table created.");
            }, errorHandler);
        });

        // Creates Expense Tables
        db.transaction((tx) => {
            const sql = "CREATE TABLE IF NOT EXISTS expense(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "amount DECIMAL(10, 2) NOT NULL," +
                "category_id INTEGER NOT NULL," +
                "date DATE NOT NULL," +
                "description TEXT," +
                "FOREIGN KEY(category_id) REFERENCES category(id));";
            const options = [];
            tx.executeSql(sql, options, () => {
                console.info("Success: expense table created.");
            }, errorHandler);
        });

        db.transaction((tx) => {
            const createTableSql = "CREATE TABLE IF NOT EXISTS savings(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "goal TEXT NOT NULL," +
                "amount DECIMAL(10, 2) NOT NULL);";

            // Execute the CREATE TABLE query
            tx.executeSql(createTableSql, [], () => {
                console.info("Success: savings table created.");
                // Call seedTables after creating all tables
            }, errorHandler);
        });
    },
    seedTables: () => {
        // Seed the 'category' table
        db.transaction((tx) => {
            const sqlCategory = "INSERT INTO category(name)" +
                "VALUES ('Groceries'), ('Utilities'), ('Rent/Mortgage'), ('Transportation'), ('Insurance'), ('Entertainment'), ('Healthcare'), ('Clothing'), ('Education'), ('Debt Repayment'), ('Misc')";
            const optionsCategory = [];
            tx.executeSql(sqlCategory, optionsCategory, () => {
                console.info("Success: category seeded.");
            },
                errorHandler);
        });

        db.transaction((tx) => {
            const sqlSavings = "INSERT INTO savings(goal, amount)" +
                "VALUES ('Emergency Fund', 1000.00), ('Vacation', 2000.00), ('New Car', 5000.00) , ('Marriage',10000) , ('House',150000), ('Any other reason',0)";
            const optionsSavings = [];
            tx.executeSql(sqlSavings, optionsSavings, () => {
                    console.info("Success: savings goals seeded.");
                },
                errorHandler);
        });
    },







}