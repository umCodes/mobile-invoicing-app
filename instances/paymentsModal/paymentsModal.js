import { alertMessage } from "../../components/alert/alert.js";
import { ListItem } from "../../components/listItem/listItem.js";
import { Modal } from "../../components/modal/modal.js";
import { database } from "../../database.js";
import { renderOrders } from "../../sections/orders/orders.js";
import { clientsDetails } from "../clientsDetails/clientsDetails.js";
import { showContent } from "../ordersDetails/ordersDetails.js";


export const Payments = new Modal('modal');
const payments = database.payments;

let target;

export const setPaymentTarget = (t) => target = t;

const inputPayment = (payment)=> {
    target.value = payment;
}




const paymentsListContainer = document.createElement('div');
paymentsListContainer.id = 'payments-list';
paymentsListContainer.classList.add('payments-list');

export const renderPaymentsList = (payments) => {

    paymentsListContainer.innerHTML = '';

    payments.forEach(payment => {
        ListItem(paymentsListContainer, 

            `
            <span>${payment.date}</span>
            <span><b>SAR${payment.amount}</b></span>
            
            `)
        .addEventListener('click', () => {
            inputPayment(payment.amount);
            Payments.hide();
        });

        Payments.removeContent()        
    });

    Payments.content(paymentsListContainer);
};


Payments.addItemBtn.addEventListener('click', () => {
    Payments.addItemInput.type = 'number';
    const payment = Payments.addItemInput.value.trim();
    const amount = Number(payment.replace(/\D/g, ''));
    if(amount <= target.getTotalAmount()){
        database.addPayment( target.id ,amount)

        showContent()
        renderPaymentsList()
        Payments.hide()
        renderOrders()
        alertMessage('Payment added successfully', 'success')
    }else
        alertMessage('Amount must be less than total amount', 'warning')
})

