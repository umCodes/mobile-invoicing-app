import { ListItem } from "../../components/listItem/listItem.js";
import { Modal } from "../../components/modal/modal.js";
import { database } from "../../database.js";
import { addExpenseForm } from "../expensesForm/expensesForm.js";


export const ExpenseCategories = new Modal('modal');
const expenseCategories = database.expense_categories;

let target;

export const setExpenseCategoryTarget = (t) => target = t;

const inputExpenseCategory = (expenseCategory)=> {
    target.value = expenseCategory;
}






const renderExpenseCategoriesList = () => {
    const expenseCategoriesListContainer = document.createElement('div');
    expenseCategoriesListContainer.id = 'expenseCategories-list';
    expenseCategoriesListContainer.innerHTML = '';

    expenseCategories.forEach(expenseCategory => {
        ListItem(expenseCategoriesListContainer, expenseCategory.name)
        .addEventListener('click', () => {
            inputExpenseCategory(expenseCategory.name);
            ExpenseCategories.hide();
        });

        ExpenseCategories.removeContent()        
    });

    ExpenseCategories.content(expenseCategoriesListContainer);
};


renderExpenseCategoriesList()


ExpenseCategories.addItemBtn.addEventListener('click', () => {

    
    if(ExpenseCategories.addItemInput.value.trim()){
        database.addExpenseCategory(ExpenseCategories.addItemInput.value.trim())
        //----------Backend-functions
        renderExpenseCategoriesList()
    }
})


