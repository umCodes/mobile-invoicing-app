// import { Form } from "../../components/form/form.js";
import { ListItem } from "../../components/listItem/listItem.js";
import { database } from "../../database.js"
import { search } from "../../functionalities/search.js";
import { expensesDetails, showContent } from "../../instances/expensesDetails/expensesDetails.js";
// import { expensesDetails, showContent } from "../../instances/expensesDetails/expensesDetails.js";

const expensesList = document.querySelector('.expenses-list');
const expensesSearchBar = document.querySelector('.expenses-search-bar');
const placeholderText = document.querySelector('.expenses-list .placeholder-text');
const selectSortType = document.querySelector('.sort-expenses');

const conditions = {
    inStock: expense => expense.stock > 0,
    outOfStock: expense => expense.stock === 0,
    expensive: expense => expense.price > 100,
    cheap: expense => expense.price <= 100
};


export const renderExpenses = (condition, sortMethod) => {

    const sortMethods = {
        byName: (a, b) => a.name.localeCompare(b.name),
        byDate: (a, b) => a.id - b.id,
        byAmount: (a, b) => b.balance - a.balance
    };




        expensesList.innerHTML = '';
        database.expenses.sort(sortMethods[sortMethod]).forEach(expense => {
        if (!condition || condition(expense)) {
            
            const expensesListItem = ListItem(expensesList, 
                `
                <div class='expense-category-n-date'>
                    <span><b>${expense.category}</b></span>
                    <span>${expense.description}</span>
                    <span>${expense.date}</span>

                </div>
                <div class='expense-amount'>
                    <span><b>SAR${expense.amount}</b></span>
                </div>
                `
            );

            expensesListItem.addEventListener('click', () => {
                expensesDetails.setData(expense);
                expensesDetails.showDetails();
                showContent();
            })

        }


    
    });



    if(expensesList.children.length === 0)
        expensesList.innerHTML = placeholderText.outerHTML


}



search(expensesSearchBar, renderExpenses);
selectSortType.addEventListener('change', event => renderExpenses('', event.target.value))
renderExpenses()




