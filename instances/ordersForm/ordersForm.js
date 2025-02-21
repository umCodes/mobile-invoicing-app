import { Form } from "../../components/form/form.js";
import { database } from "../../database.js";
import { renderOrders } from "../../sections/orders/orders.js";
import { alertMessage } from "../../components/alert/alert.js";
import { confirmModal } from "../../components/confirm/confirm.js";
import { Clients, renderClientsList, setClientTarget } from "../clientsModal/clientsModal.js";
import { ordersDetails, showContent } from "../ordersDetails/ordersDetails.js";
import { ListItem } from "../../components/listItem/listItem.js";
import {Items, renderItemsList} from "../itemsModal/itemsModal.js";



export const orderClient = {client: null};
export const orderItems = {items: []};

export const addOrderForm = new Form('', 'addOrderForm');



export const orderClientInput = addOrderForm.input(
    'orderClient',
    'text',
    '<i class="fa-solid fa-user"></i>',
    true //required
)

orderClientInput.placeholder = 'Client Name'
orderClientInput.readOnly = true;


orderClientInput.onclick = () => {
    setClientTarget(orderClientInput)
    renderClientsList()
    Clients.show()
};

export const orderDateInput = addOrderForm.input(
        'orderDate',
        'date',
        '<i class="fa-solid fa-calendar"></i>'
)

orderDateInput.value = new Date().toISOString().split('T')[0];
 

export const orderItemsBtn = addOrderForm.button(
    '<i class="fa-solid fa-plus"></i> add item',
    'add-item-btn',
    () =>{
        renderItemsList()
        Items.show()
        }
)

const itemsList = document.createElement('div');
itemsList.className = 'order-items-list';
export const renderOrderItems = (order) => {
    itemsList.innerHTML = '';

    const header = document.createElement('h2');
    header.textContent = 'Items';
    itemsList.appendChild(header);

    
    (order.inv_items || order).forEach(item => {
        let orderItem = Array.isArray(item)? item[0]: item;
        ListItem(itemsList, (() => {
            // Create inner div for name and input
            const detailsDiv = document.createElement("div");
            detailsDiv.classList.add("item-details");
        
            // Create paragraph for item name
            const paragraph = document.createElement("p");
            paragraph.classList.add("item-name");
            paragraph.textContent = orderItem.name;
            
        
            // Create div for item unit
            const unitSpan = document.createElement("span");
            unitSpan.classList.add("item-unit");
            unitSpan.textContent = orderItem.unit;
        
        
            // Create input element for quantity
            const input = document.createElement("input");
            input.classList.add("item-quantity");
            input.type = "number";
            input.placeholder = "quantity";
            input.value = ((item.quantity || item[1]) || 1).toFixed(2);                 

            input.addEventListener('change', event => {
                item[1] = Number(input.value);
                orderItem.quantity = Number(input.value);
                orderItem.total = orderItem.quantity*orderItem.price;
                
                renderPrice()

    })              


            // Append name and input to details div
            paragraph.appendChild(unitSpan);
            detailsDiv.appendChild(paragraph);

            // Create button container
            const buttonDiv = document.createElement("div");
            buttonDiv.classList.add("item-actions");

            const price = document.createElement("span");

            const renderPrice = () => {
                price.classList.add("item-price");
                price.innerHTML = `<b>SAR${orderItem.price*orderItem.quantity}</b>`;

            }

            detailsDiv.appendChild(price);

            renderPrice()

            // Create button
            const button = document.createElement("button");
            button.classList.add("delete-item-button");
            button.innerHTML = "<i class='fa-solid fa-trash'></i>";
            button
            .addEventListener('click', () => {
                if(Array.isArray(order))
                    order.splice(order.indexOf(orderItem), 1);
                else
                    database.removeInvoiceItem(order.id, orderItem.id)


                renderOrderItems(order);
            });

            // Append button to button div
            buttonDiv.appendChild(input);
            buttonDiv.appendChild(button);


            return [detailsDiv, buttonDiv];


        })()
        )
})


    const itemtotal = document.createElement('div');
    itemtotal.className = 'items-total';
    console.log(order);    
    itemtotal.innerHTML = `<b>Total: SAR${((order.inv_items || order).reduce((total, item) => total + ((item[0] || item).total), 0))}</b>`
    if(order.inv_items || order.length > 0) itemsList.appendChild(itemtotal); 
}


addOrderForm.body.appendChild(itemsList);


export const orderDescriptionArea = addOrderForm.textarea(
    'orderDescription',
    '<i class="fa-solid fa-note-sticky"></i>'
)

orderDescriptionArea.placeholder = 'Description'


export const setInputValues = (order) => {
    orderClientInput.value = order.client.name || '';
    orderDateInput.value = order.date || '';    
    orderDescriptionArea.value = order.notes || '';
}



    
const confirmDelete = new confirmModal('Cancel', 'Delete');

confirmDelete.bodyContent(
    `
    <h3>This order will be deleted</h3>
    <p>Are you sure you want to continue?</p>
    `
);


confirmDelete.buttonsAction(() => confirmDelete.hide(),
    () => {  
        
        confirmDelete.hide()
        addOrderForm.cancel.click()
        database.removeInvoice(addOrderForm.getData().id)

        alertMessage('Order deleted', 'delete');
        setTimeout(() => {
                renderOrders()
            }, 500)
        
    })


   

addOrderForm.cancel.addEventListener('click',() => {
    orderClientInput.value = '';
    orderDateInput.value = '';
    orderDescriptionArea.value = '';
    orderItems.items.splice(0, orderItems.items.length)
    addOrderForm.setData(undefined);

    
    
})


addOrderForm.saveAction(
    event => {
        event.preventDefault();       

        if(!addOrderForm.getData()){
            const newInv = database.addInvoice(
                orderClient.client,
                orderDateInput.value,
                orderDescriptionArea.value,                
            )

            orderItems.items.forEach(item => database.addInvoiceItem(newInv.id, ...item));
            alertMessage('Invoice added successfully', 'success')
        }
        else{
                console.log(orderClient.client);
                
                const updatedInv = database.updateInvoice(
                    addOrderForm.getData().id,
                    {
                        client: orderClient.client,
                        date: orderDateInput.value,
                        description: orderDescriptionArea.value
                    }               
                )
                console.log(updatedInv);
                
                orderItems.items.forEach(item => database.addInvoiceItem(updatedInv.id, ...item));
                alertMessage('Invoice updated successfully', 'success')
                showContent()
           

        }


        addOrderForm.cancel.click()
        renderOrders()

    }
)



export const addOrderBtn = document.querySelector('.add-order-btn')
addOrderForm.showBtnPlus(addOrderBtn, () => {
    console.log(orderItems.items);
    renderOrderItems([])
}
);


document.body.appendChild(confirmDelete.render())
document.body.appendChild(addOrderForm.render())



