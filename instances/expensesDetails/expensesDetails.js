import { alertMessage } from "../../components/alert/alert.js";
import { confirmModal } from "../../components/confirm/confirm.js";
import { DetailSection } from "../../components/details/details.js";
import { database } from "../../database.js";
import { renderExpenses } from "../../sections/expenses/expenses.js";
import { addExpenseForm, expenseCategoryInput, expensePaymentMethodInput, setInputValues } from "../expensesForm/expensesForm.js";
import { setExpenseCategoryTarget } from "../expenseCategoriesModal/expenseCategoriesModal.js";
import { setPaymentMethodTarget } from "../paymentMethodsModal/paymentMethodsModal.js";
import {generateExpenseReport} from "../../PDFs/expenseReport.js"


export const expensesDetails = DetailSection();
expensesDetails.render().classList.add('expenses-details');


      

// expensesDetails.setData(database.expenses[0]);




export const showContent = () =>{

    const content = expensesDetails.getContent();
    if (content)
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }

    const expense = expensesDetails.getData();
    expensesDetails.setHeader(expense.category)


    expensesDetails.addContent((() => {
        const expenseCard = document.createElement('div');
        expenseCard.className = 'expense-card';

        const expenseInfo = document.createElement('div');
        expenseInfo.className = 'expense-info';

        expenseInfo.innerHTML = 
        `
            <div class='expense-data'>
            
                <h2>
                    ${expense.category || ''}
                </h2>
                <p>${expense.date || ''}</p>
                <p>${expense.description || ''}</p>
                <div class='amount'>
            </div>
            
            </div>
        `;


        
        const expenseAmount = document.createElement('div');
        expenseAmount.className = 'expense-amount';

        expenseAmount.innerHTML = 
        `
        
            <span>Amount: 
                <b>SAR${expense.amount}</b> 
            </span>
            
        `


        

        expenseCard.appendChild(expenseInfo)
        expenseCard.appendChild(expenseAmount)
        return expenseCard;
    })())

    expensesDetails.addContent((() =>{
            const actionBtns = document.createElement('div');
            actionBtns.className = 'action-btns';
    
            let actionItems = [
                { icon: 'fa-solid fa-pen', label: 'Edit' },
                { icon: 'fa-solid fa-file', label: 'Send PDF' },
                { icon: 'fa-solid fa-trash', label: 'Delete' }
            ];
        
            
            actionItems.forEach(action => {
                const actionItem = document.createElement('div');
                actionItem.className = 'action-item';
                
                const iconSpan = document.createElement('span');
                iconSpan.className = `icon ${action.label.toLowerCase().replace(' ', '-')}-icon`;
                
                const iconElement = document.createElement('i');
                iconElement.className = action.icon;
                iconSpan.appendChild(iconElement);
            
                
                const actionLabel = document.createElement('span');
                actionLabel.className = 'action-label';
                actionLabel.textContent = action.label;
                
                if(action.label === 'Edit'){
                    addExpenseForm.showBtn(actionItem);
                    actionItem.addEventListener('click', () => {
                        addExpenseForm.setData(expense);
                        setInputValues(expense)

                    })
                }
                    
                
                if(action.label === 'Send PDF')
                    actionItem.addEventListener('click', () => generateExpenseReport(expense));
                
                
                
                    
                const confirmDelete = new confirmModal('Cancel', 'Delete');
                
                confirmDelete.bodyContent(
                    `
                    <h3>This expense will be deleted</h3>
                    <p>Are you sure you want to continue?</p>
                    `
                )
                
                
                confirmDelete.buttonsAction(() => confirmDelete.hide(),
                    () => {  
                        
                            confirmDelete.hide()                    
                            database.removeExpense(expense.id);
                            expensesDetails.hideDetails();
                            setTimeout(() => {
                                alertMessage(`Expense deleted`, 'delete');
                                renderExpenses()
                            }, 500)
    
                        })
                
                document.body.appendChild(confirmDelete.render())

                if(action.label === 'Delete')
                    actionItem.addEventListener('click', () => {
                        confirmDelete.show()
                    }) 
    
                actionItem.appendChild(iconSpan);
                actionItem.appendChild(actionLabel);
                actionBtns.appendChild(actionItem)
    
    
            });
    
            return actionBtns;
        })())
    

}

