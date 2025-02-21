import { ListItem } from "../../components/listItem/listItem.js";
import { Modal } from "../../components/modal/modal.js";
import { database } from "../../database.js";
import { addExpenseForm } from "../expensesForm/expensesForm.js";
// import { addItemBtn, addItemForm, itemPaymentMethodInput } from "../itemsForm/itemsForm.js";


export const PaymentMethods = new Modal('modal');
const paymentMethods = database.payment_methods;

let target;

export const setPaymentMethodTarget = (t) => target = t;

const inputPaymentMethod = (paymentMethod)=> {
    target.value = paymentMethod;
}






const renderPaymentMethodsList = () => {
    const paymentMethodsListContainer = document.createElement('div');
    paymentMethodsListContainer.id = 'paymentMethods-list';
    paymentMethodsListContainer.innerHTML = '';

    paymentMethods.forEach(paymentMethod => {
        ListItem(paymentMethodsListContainer, paymentMethod.name)
        .addEventListener('click', () => {
            inputPaymentMethod(paymentMethod.name);
            PaymentMethods.hide();
        });

        PaymentMethods.removeContent()        
    });

    PaymentMethods.content(paymentMethodsListContainer);
};


renderPaymentMethodsList()


PaymentMethods.addItemBtn.addEventListener('click', () => {

    
    if(PaymentMethods.addItemInput.value.trim()){
        database.addPaymentMethod(PaymentMethods.addItemInput.value.trim())
        //----------Backend-functions
        renderPaymentMethodsList()
    }
})


