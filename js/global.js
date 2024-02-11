// Runs when the document is ready
$(document).ready(() => {
    console.log("Document ready.")
    // Initializes the database
    initializeDB();

    // When expenses page shows
    $("#expensePage").on("pageshow", () => {
        showExpenses();
    });

    // When add expense page shows
    $("#addExpensePage").on("pageshow", () => {
        setUpAddPage();
    });

    // When income page shows
    $("#incomePage").on("pageshow", () => {
        showIncomes();
    });

    // When add income page shows
    $("#addIncomePage").on("pageshow", () => {
        setUpAddIncomePage();
    });

    $("#savingsPage").on("pageshow", () => {
        populateInitialGoalsDropdown();
    });

    $("#generateSavingsPlan").on("click", () => {
        const selectedGoalId = $("#initialGoalDropdown").val();
        generateSavingsPlan(selectedGoalId);
    });

});

function initializeDB() {
    try {
        DB.createDatabase();
        if (db) {
            DB.createTables();
        }
    } catch (err) {
        console.error("Error: Could not initialize database. " + err);
    }
}

