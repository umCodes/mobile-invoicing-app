import { Form } from "../../components/form/form.js";
import { database } from "../../database.js";
import { renderExpenses } from "../../sections/expenses/expenses.js";
import { alertMessage } from "../../components/alert/alert.js";
import { confirmModal } from "../../components/confirm/confirm.js";
import { showContent } from "../expensesDetails/expensesDetails.js";
import { PaymentMethods, setPaymentMethodTarget } from "../paymentMethodsModal/paymentMethodsModal.js";
import { ExpenseCategories, setExpenseCategoryTarget } from "../expenseCategoriesModal/expenseCategoriesModal.js";



export const addExpenseForm = new Form('', 'addExpenseForm');





export const expenseCategoryInput = addExpenseForm.input(
    'expenseCategory',
    'text',
    '<i class="fas fa-cube"></i>',
    true//required
)
export const expenseDateInput = addExpenseForm.input(
    'expenseDate',
    'date',
    '<i class="fas fa-calendar"></i>',
    true//required
)


expenseDateInput.value = new Date().toISOString().split('T')[0];

export const expensePaymentMethodInput = addExpenseForm.input(
    'expensePaymentMethod',
    'text',
    '<i class="fas fa-wallet"></i>',
    true//required
)

expenseCategoryInput.placeholder = 'Catagory';
expensePaymentMethodInput.placeholder = 'Payment Method';

expenseCategoryInput.readOnly = true;
expensePaymentMethodInput.readOnly = true;
PaymentMethods.showBtn(expensePaymentMethodInput);
ExpenseCategories.showBtn(expenseCategoryInput);


export const expenseAmountInput = addExpenseForm.input(
    'expenseAmount',
    'number',
    '<i class="fas fa-dollar"></i>',
    true //required
)

expenseAmountInput.placeholder = 'Amount';

export const expenseNotesArea = addExpenseForm.textarea(
    'expenseNotes',
    '<i class="fas fa-sticky-note"></i>'
);
expenseNotesArea.placeholder = 'Additional notes...';

export const setInputValues = (expense) => {
    expenseCategoryInput.value = expense.category;    
    expenseDateInput.value = expense.date;
    expenseAmountInput.value = expense.amount;
    expenseNotesArea.value = expense.description;
    expensePaymentMethodInput.value = expense.payment_method
}




    
export const confirmDelete = new confirmModal('Cancel', 'Delete');

confirmDelete.bodyContent(
    `
        <h3>Expense will be deleted this cannot be undone</h3>
        <p>Are you sure you want to continue?</p>
    `
)




   

addExpenseForm.saveAction(
    event => {
        event.preventDefault();       
        
        const expense = addExpenseForm.getData();
        if(expenseCategoryInput.value && expenseAmountInput.value){
            if(!expense){
                //Adds an Expense:
                database.addExpense(
                    expenseCategoryInput.value, // Name
                    expenseDateInput.value, // Date
                    Number(expenseAmountInput.value), // Amount
                    expensePaymentMethodInput.value, // Payment Method
                    expenseNotesArea.value, // Notes

                )
                alertMessage('Expense Added Successfully', 'success');
            }
            else{    
            
            
            //Updates Existing Expense:
                database.updateExpense(expense.id, {
                    category: expenseCategoryInput.value, // Catagory
                    date: expenseDateInput.value, // Date
                    amount: Number(expenseAmountInput.value), // Amount
                    description: expenseNotesArea.value, // Notes
                    payment_Method: expensePaymentMethodInput.value, // Payment Method
                })
                alertMessage('Expense Updated Successfully', 'success');
                showContent()

            }

            addExpenseForm.cancel.click()
        }
        else
            alertMessage('Required Feilds not filled', 'warning');
       

        renderExpenses()

    }
)



export const addExpenseBtn = document.querySelector('.add-expense-btn')
addExpenseForm.showBtn(addExpenseBtn);


setPaymentMethodTarget(expensePaymentMethodInput)
setExpenseCategoryTarget(expenseCategoryInput);


document.body.appendChild(confirmDelete.render())
document.body.appendChild(addExpenseForm.render());
addExpenseForm.render().appendChild(PaymentMethods.render())
addExpenseForm.render().appendChild(ExpenseCategories.render())