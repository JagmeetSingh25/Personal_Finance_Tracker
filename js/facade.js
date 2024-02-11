
function showExpenses() {
    calculateRemainingIncome((remainingIncome) => {
       const htmlArea = $("#remainingIncomeArea");
       let htmlCode;
       if(remainingIncome[0] === '-'){
           htmlCode = `<p>Remaining Income: <span class="red">${remainingIncome}</span></p> `;
       }
       else{
           htmlCode = ` <p>Remaining Income: <span class="green">${remainingIncome}</span></p> `;
       }
        htmlArea.html(htmlCode);
    });
    ExpenseTable.selectAll((tx, results) => {
        console.info("Success: expenses retrieved.");


        let htmlCode = "";
        if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
                let row = results.rows[i];
                let id = row["id"];
                let amount = row["amount"];
                let date = row["date"];
                let description = row["description"];


                htmlCode += `
                    <li>
                        <a data-role="button" data-row-id="${id}" href="#">
                            <h2>$${amount}</h2>
                            <h2>${date}</h2>
                            <h2>${description}</h2>
                        </a>
                    </li>
                `;
            }
        }

        htmlCode += `
            <li style="border: none">
                <a id="Add" data-role="button" data-row-id="" href="#" class="ui-icon-plus ui-btn-icon-notext">
                </a>
            </li>
        `;

        let expenseList = $("#expenseListView");
        expenseList.html(htmlCode).listview("refresh");

        function clickHandler() {
            localStorage.setItem("expenseId", $(this).attr("data-row-id"));
            $(location).prop("href", "#addExpensePage");
        }

        $("#expenseListView a").on("click", clickHandler);
    });
}




// Sets up the add page
function setUpAddPage(){
    // Reset form
    $("#addExpenseForm").get(0).reset();

    let id = localStorage.getItem("expenseId");
    let action = id === "" ? "Add" : "Update";
    const title = $("#addExpensePage header h1");
    title.text(action + " Expense");
    populateCategoryDropdown();

    // Buttons
    const deleteButton = $("#btnExpenseDelete");
    const addButton = $("#btnExpenseAdd");
    addButton.text(action);
    const cancelButton = $("#btnExpenseCancel");





    switch (action){
        case "Update":
            deleteButton.show();
            deleteButton.on("click", () =>{
                ExpenseTable.delete([id]);
                alert("Expense deleted.");
                $(location).prop("href", "#expensePage");
            });
            ExpenseTable.select([id], (tx, results) => {
               let row = results.rows[0];
               let amount = row["amount"];
               let category_id = row["category_id"];
               let date = row["date"];
               let description = row["description"];

               $("#expenseAmount").val(amount);
               $("#expenseCategory").val(category_id).change();
               $("#expenseDate").val(date);
               $("#expenseDescription").val(description);
            });
            addButton.off("click").on("click", updateExpense);
            break;
        case "Add":
            deleteButton.hide();
            addButton.off("click").on("click", addExpense);
            break;
    }

    cancelButton.on("click", () => {
       $(location).prop("href", "#expensePage");
    });

}

// Populates the category dropdown
function populateCategoryDropdown(){
    Category.selectAll((tx, results) => {
        let htmlCode = "";
        htmlCode += "<option> Select Category </option>";
        for(let i =0; i < results.rows.length; i++){
            let row = results.rows[i];
            let id = row["id"];
            let name = row["name"];
            htmlCode += `<option value="${id}">${name}</option>`;
        }
        const categoryDropdown = $("#expenseCategory");
        categoryDropdown.empty();
        categoryDropdown.append(htmlCode);
        categoryDropdown.selectmenu("refresh");
    });
}

// Trys to add expense to database
function addExpense(){
    const isValid = doValidate_expenseAddForm();
    if(isValid){
        ExpenseTable.insert(createExpense());
        $(location).prop("href", "#expensePage");
        alert("Expense added.");
    }
    else{
        console.log("Error: could not add expense; form is invalid.")
    }
}

function updateExpense(){
    const isValid = doValidate_expenseAddForm();
    if(isValid){
        ExpenseTable.update(createExpense(), localStorage.getItem("expenseId"));
        $(location).prop("href", "#expensePage");
        alert("Expense updated.");
    }
    else{
        console.log("Error: could not update expense; form is invalid.")
    }
}

function createExpense(){
    const amount = $("#expenseAmount");
    const category_id = $("#expenseCategory");
    const date = $("#expenseDate");
    const description = $("#expenseDescription");
    return new Expense(amount.val(), category_id.val(), date.val(), description.val())
}

function showIncomes(){
    IncomeTable.selectAll((tx, results) => {
        console.info("Success: incomes retrieved.");

        let htmlCode = ""
        if(results.rows.length > 0){
            for(let i = 0; i < results.rows.length; i++){
                let row = results.rows[i];
                let id = row["id"];
                let amount = row["amount"];
                let date = row["date"];
                let description = row["description"];
                htmlCode += `
                <li>
                    <a data-role="button" data-row-id=${id} href="#">
                        <h2>$${amount}</h2>
                        <h2>${date}</h2>
                        <h2>${description}</h2>
                    </a>
                </li>
                `
            }
        }
        htmlCode += `
            <li style="border: none">
                <a id="Add" data-role="button" data-row-id="" href="#" class="ui-icon-plus ui-btn-icon-notext" >
                </a>
            </li>
        
        `

        let incomeList = $("#incomeListView");
        incomeList = incomeList.html(htmlCode);
        incomeList.listview().listview("refresh");

        function clickHandler() {
            localStorage.setItem("incomeId", $(this).attr("data-row-id"));
            $(location).prop("href", "#addIncomePage");
        }

        $("#incomeListView a").on("click", clickHandler);

    });
}

function setUpAddIncomePage(){
    // Reset form
    $("#addIncomeForm").get(0).reset();

    let id = localStorage.getItem("incomeId");
    let action = id === "" ? "Add" : "Update";
    const title = $("#addIncomePage header h1");
    title.text(action + " Income");

    // Buttons
    const deleteButton = $("#btnIncomeDelete");
    const addButton = $("#btnIncomeAdd");
    addButton.text(action);
    const cancelButton = $("#btnIncomeCancel");


    switch (action){
        case "Update":
            deleteButton.show();
            deleteButton.on("click", () =>{
                IncomeTable.delete([id]);
                alert("Income deleted.");
                $(location).prop("href", "#incomePage");
            });
            IncomeTable.select([id], (tx, results) => {
                let row = results.rows[0];
                let amount = row["amount"];
                let source = row["source"];
                let date = row["date"];
                let description = row["description"];

                $("#incomeAmount").val(amount);
                $("#incomeSource").val(source);
                $("#incomeDate").val(date);
                $("#incomeDescription").val(description);
            });
            addButton.off("click").on("click", updateIncome);
            break;
        case "Add":
            deleteButton.hide();
            addButton.off("click").on("click", addIncome);
            break;
    }

    cancelButton.on("click", () => {
        $(location).prop("href", "#incomePage");
    });


}

function createIncome(){
    const amount = $("#incomeAmount");
    const source = $("#incomeSource");
    const date = $("#incomeDate");
    const description = $("#incomeDescription");
    return new Income(amount.val(), source.val(), date.val(), description.val());
}

function addIncome(){
    const isValid = doValidate_incomeAddForm();
    if(isValid){
        IncomeTable.insert(createIncome());
        $(location).prop("href", "#incomePage");
        alert("Income added.");
    }
    else{
        console.log("Error: could not add income; form is invalid.")
    }
}

function updateIncome(){
    const isValid = doValidate_incomeAddForm();
    if(isValid){
        alert(localStorage.getItem("incomeId"));
        IncomeTable.update(createIncome(), localStorage.getItem("incomeId"));
        $(location).prop("href", "#incomePage");
        alert("Income updated.");
    }
    else{
        console.log("Error: could not update income; form is invalid.")
    }
}


function populateInitialGoalsDropdown() {
    const dropdown = $("#initialGoalDropdown");

    // Clear existing options
    dropdown.empty();

    // Add default option
    dropdown.append("<option>Select Goal</option>");

    // Fetch goals from the savings table and populate dropdown
    SavingsTable.selectAll((tx, results) => {
        for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows[i];
            let id = row["id"];
            let goal = row["goal"];
            let amount = row["amount"];

            // Add option to dropdown
            dropdown.append(`<option value="${id}">${goal} - $${amount}</option>`);
        }

        // Refresh the dropdown
        dropdown.selectmenu("refresh");
    });
}


function generateSavingsPlan() {
    // Step 1: Fetch Selected Goal Information
    const selectedGoalId = $("#initialGoalDropdown").val();
    SavingsTable.selectById(selectedGoalId, (selectedGoal) => {
        if (selectedGoal) {
            // Step 2: Calculate Total Income and Expenses
            let totalIncome = 0;
            let totalExpenses = 0;

            const fetchIncome = new Promise((resolve) => {
                IncomeTable.selectAll((tx, results) => {
                    for (let i = 0; i < results.rows.length; i++) {
                        totalIncome += results.rows[i].amount;
                    }
                    resolve(totalIncome);
                });
            });

            const fetchExpenses = new Promise((resolve) => {
                ExpenseTable.selectAll((tx, results) => {
                    for (let i = 0; i < results.rows.length; i++) {
                        totalExpenses += results.rows[i].amount;
                    }
                    resolve(totalExpenses);
                });
            });

            Promise.all([fetchIncome, fetchExpenses])
                .then(([totalIncome, totalExpenses]) => {
                    // Step 3: Get the time (in years) user wants to achieve the goal
                    const yearsToAchieve = parseInt($("#timeToAchieve").val(), 10) || 0;

                    // Step 4: Display Total Income and Expenses
                    $("#totalIncomeDisplay").text(`Total Income: $${totalIncome.toFixed(2)}`);
                    $("#totalExpensesDisplay").text(`Total Expenses: $${totalExpenses.toFixed(2)}`);


                    // Step 5: Calculate Remaining Amount
                    const remainingAmount = totalIncome - totalExpenses;


                    // Step 6: Check if Goal Amount is Achievable
                    if (remainingAmount >= selectedGoal.amount) {
                        // Step 7: Calculate Savings Amount and Monthly Savings Goal
                        const savingsAmount = remainingAmount;
                        const monthlySavingsGoal = yearsToAchieve > 0 ? selectedGoal.amount / (yearsToAchieve * 12) : 0;

                        // Step 8: Display the Plan on the Savings Page
                        displaySavingsPlan(selectedGoal.goal, selectedGoal.amount, yearsToAchieve, savingsAmount, monthlySavingsGoal, totalIncome, totalExpenses);
                    } else {
                        // Goal is not achievable with the current financial situation
                        recommendMonthlyInvestment(selectedGoal.amount, yearsToAchieve, remainingAmount, totalIncome, totalExpenses);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    });
}

function recommendMonthlyInvestment(goalAmount, yearsToAchieve, remainingAmount, totalIncome, totalExpenses) {
    // Calculate the monthly investment needed to achieve the goal
    const monthlyInvestmentNeeded = (goalAmount - remainingAmount) / (yearsToAchieve * 12);

    // Determine text color based on conditions
    const incomeColor =  "green" ;
    const expensesColor = "red";
    const investmentColor = "blue";

    // Update a section on the savings page to inform the user and provide recommendations
    const savingsPlanSection = $("#savingsPlanSection");

    savingsPlanSection.html(`
        <h3>Goal Not Currently Achievable</h3>
        <p>To achieve your goal in ${yearsToAchieve} years, consider investing approximately:</p>
        <p><span style="color: ${investmentColor}">$${monthlyInvestmentNeeded.toFixed(2)} per month.</span></p>
        <p><span style="color: ${incomeColor}">Total Income: $${totalIncome.toFixed(2)}</span></p>
        <p><span style="color: ${expensesColor}">Total Expenses: $${totalExpenses.toFixed(2)}</span></p>
        
        <img src="../img/downgrade_graph.jpg" alt="Downvote" width="800" height="200" style="margin-left: 500px">
    `);
}


function displaySavingsPlan(goal, targetAmount, yearsToAchieve, savingsAmount, monthlySavingsGoal, totalIncome, totalExpenses) {
    // Update a section on the savings page to display the savings plan information
    const savingsPlanSection = $("#savingsPlanSection");

    // Set a congratulatory message based on financial status
    const congratulatoryMessage = savingsAmount >= targetAmount ? "Congratulations! You are on track to achieve your goal." : "Keep going! You're making progress towards your goal.";

    // Set colors for income and expenses based on their values
    const incomeColor ="green";
    const expensesColor =  "red";
    const savingsColor ="blue";

    savingsPlanSection.html(`
        <h3>Savings Plan for ${goal}</h3>
        <p>${congratulatoryMessage}</p>
        <p>Target Amount: $${targetAmount}</p>
        <p>Years to Achieve: ${yearsToAchieve}</p>
        <p>Savings Amount: <span style="color: ${savingsColor};">$${savingsAmount.toFixed(2)}</p>
        <p>Monthly Savings Goal: $${monthlySavingsGoal.toFixed(2)}</p>
        <p>Total Income: <span style="color: ${incomeColor};">$${totalIncome.toFixed(2)}</span></p>
        <p>Total Expenses: <span style="color: ${expensesColor};">$${totalExpenses.toFixed(2)}</span></p>
        
       <img src="../img/upgrade_graph.jpg" alt="Downvote" width="800" height="200" style="margin-left: 500px">
    `);



}





