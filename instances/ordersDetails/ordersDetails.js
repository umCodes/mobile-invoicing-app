import { alertMessage } from "../../components/alert/alert.js";
import { confirmModal } from "../../components/confirm/confirm.js";
import { DetailSection } from "../../components/details/details.js";
import { ListItem } from "../../components/listItem/listItem.js";
import { generatePDF } from "../../components/PDF/PDF.js";
import { database } from "../../database.js";
import { renderOrders } from "../../sections/orders/orders.js";
import { addOrderForm, orderClient, renderOrderItems, setInputValues } from "../ordersForm/ordersForm.js";
import { Payments, renderPaymentsList, setPaymentTarget } from "../paymentsModal/paymentsModal.js";



export const ordersDetails = DetailSection();

ordersDetails.render().classList.add('orders-details')

ordersDetails.getBackButton().addEventListener('click', () => Payments.hide());


const confirmCheck = confirmModal('Cancel', 'Continue');
confirmCheck.bodyContent(`
        <h3>Are you sure you want to change the status?</h3>
        <p>This action cannot be reversed</p>
        `);





 



export const showContent = () =>{

    const content = ordersDetails.getContent();
    
    if (content)
        while (content.firstChild) 
            content.removeChild(content.firstChild);

    const order = ordersDetails.getData();
    ordersDetails.setHeader(order.id);




    ordersDetails.addContent((() => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';

        const orderInfo = document.createElement('div');
        orderInfo.className = 'order-info';

        const orderData = document.createElement('div');
        orderData.className = 'order-data';

        const header = document.createElement('h2');
        header.textContent = order.id || '';

        const statusSpan = document.createElement('span');
        statusSpan.className = 'order-status';
        statusSpan.setAttribute('status', order.status);
        statusSpan.textContent = order.status;


        confirmCheck.buttonsAction(
            () => confirmCheck.hide(),
                () => {
                    order.status = 'checked';
                    showContent()
                    renderOrders()
                    alertMessage('Invoice Checked', 'info')
                    confirmCheck.hide()
                }
        
        )

        statusSpan.addEventListener('click', () =>{ 
            if(order.status === 'pending')confirmCheck.show()
        })

        const dateP = document.createElement('p');
        dateP.textContent = order.date || '';

        const clientP = document.createElement('p');
        const clientB = document.createElement('b');
        clientB.textContent = order.client.name || '';
        clientP.appendChild(clientB);


        orderData.appendChild(header);
        header.appendChild(statusSpan);
        orderData.appendChild(dateP);
        orderData.appendChild(clientP);

        orderInfo.appendChild(orderData);

        
        const orderTotal = document.createElement('div');
        orderTotal.className = 'order-total';

        orderTotal.innerHTML = 
        `
        
                <h3>SAR${order.getTotalAmount()}</h3> 
            
        `

        

        orderCard.appendChild(orderInfo)
        orderCard.appendChild(orderTotal)
        return orderCard;
    })())


    ordersDetails.addContent((() =>{
        const actionBtns = document.createElement('div');
        actionBtns.className = 'action-btns';

        let actionItems = [
            { icon: 'fa-solid fa-pen', label: 'Edit' },
            { icon: 'fa-solid fa-circle-dollar-to-slot', label: 'Payments' },
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
                if(order.status === 'pending'){
                    addOrderForm.showBtn(actionItem)
                    
                    actionItem.addEventListener('click', () =>{
                        addOrderForm.setData(order)
                        orderClient.client = order.client;                        
                        setInputValues(order)                    
                        renderOrderItems(order)
                        addOrderForm.render()
                                    
                    })}
            }


            if(action.label === 'Payments'){
                actionItem.addEventListener('click', () => {
                    setPaymentTarget(order)
                    renderPaymentsList(order.payments)
                    Payments.show()

                })
            }

            
            if(action.label === 'Send PDF')
                actionItem.addEventListener('click', () => generatePDF(order.client, order));
            
            
            
                
            const confirmDelete = new confirmModal('Cancel', 'Delete');
            
            confirmDelete.bodyContent(
                `
                <h3>This invoice will be deleted</h3>
                <p>Are you sure you want to continue?</p>
                `
            )
            
            
            confirmDelete.buttonsAction(() => confirmDelete.hide(),
                () => {  
                    
                        confirmDelete.hide()                    
                        database.removeInvoice(order.id);
                        ordersDetails.hideDetails();
                        setTimeout(() => {
                            alertMessage(`Invoice ${order.id} deleted`, 'delete');
                            renderOrders()
                        }, 500)

                    })
            
            document.body.appendChild(confirmDelete.render())
            if(action.label === 'Delete')
                actionItem.addEventListener('click', () => {
                    confirmDelete.show()
                }) 

            actionItem.appendChild(iconSpan);
            actionItem.appendChild(actionLabel);            
            actionBtns.appendChild(actionItem);

            if(action.label === 'Edit' && order.status !== 'pending')
                actionBtns.removeChild(actionItem)


        });

        return actionBtns;
    })())

    ordersDetails.addContent((()=>{
        const itemsList = document.createElement("div");
        itemsList.className = 'items-list'
        itemsList.innerHTML = `<h2>Items</h2>`
        order.inv_items.forEach(item =>
            ListItem(
                itemsList,
                `
                <div class='item-details'>
                
                <p class='item-name'><b>${item.name}</b></p>
                <span class='item-quantity'>quantity: ${item.quantity}</span>
                <span class='item-unit'>${item.unit}</span>
                </div>
                <div class='item-total-price'>
                    <span class='item-total'><b>SAR${item.total}</b></span>
                </div>
                `
        ))

            
        const totalAmount = document.createElement('div');
        totalAmount.className = 'total-amount'
        totalAmount.innerHTML = `<b>Total: SAR${order.inv_items.reduce((total, item) => total + item.total, 0)}</b>` 

        if(order.inv_items.length > 0)
            itemsList.appendChild(totalAmount)
        
        return itemsList;


    })());
}










ordersDetails.render().appendChild(confirmCheck.render())