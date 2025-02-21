import { ListItem } from "../../components/listItem/listItem.js";
import { Modal } from "../../components/modal/modal.js";
import { database } from "../../database.js";
import { clientsDetails } from "../clientsDetails/clientsDetails.js";
import { addOrderForm, orderItems, renderOrderItems } from "../ordersForm/ordersForm.js";


export const Items = new Modal('modal');

Items.render().classList.add('add-items-modal');

const items = database.items;

let target;

export const setItemTarget = (t) => target = t;


const inputItem = (item)=> {
    target.value = item;
}






export const renderItemsList = () => {
    const itemsListContainer = document.createElement('div');
    itemsListContainer.id = 'items-list';

    items.forEach(item => {
        ListItem(itemsListContainer, 
            (() => {
                // Create inner div for name and input
                const detailsDiv = document.createElement("div");
                detailsDiv.classList.add("item-details");
            
                // Create paragraph for item name
                const paragraph = document.createElement("p");
                paragraph.classList.add("item-name");
                paragraph.textContent = item.name;
            
                // Create div for item unit
                const unitSpan = document.createElement("span");
                unitSpan.classList.add("item-unit");
                unitSpan.textContent = item.unit;

                // Create div for item price
                const priceSpan = document.createElement("span");
                priceSpan.classList.add("item-price");
                priceSpan.textContent = 'SAR' + item.price;
            
            
                // Create input element for quantity
                const input = document.createElement("input");
                input.classList.add("item-quantity");
                input.type = "number";
                input.placeholder = "quantity";
                input.value = (1).toFixed(2);                 

                // Append name and input to details div
                paragraph.appendChild(unitSpan);
                detailsDiv.appendChild(paragraph);
                detailsDiv.appendChild(priceSpan);

                // Create button container
                const buttonDiv = document.createElement("div");
                buttonDiv.classList.add("item-actions");

                // Create button
                const button = document.createElement("button");
                button.classList.add("add-item-button");
                button.innerHTML = "<i class='fa-solid fa-plus'></i>";
                button
                .addEventListener('click', () => {
                    const quantity =  Number(input.value)
                    orderItems.items.push([{...item, ...{quantity: quantity, total: quantity * item.price}}, quantity])
                   
                    renderOrderItems(
                        addOrderForm.getData()
                        ?
                        [...addOrderForm.getData().inv_items, ...orderItems.items] 
                        :
                         orderItems.items
                        );
                    
                    
                    Items.hide();
                });

                // Append button to button div
                buttonDiv.appendChild(input);
                buttonDiv.appendChild(button);


                return [detailsDiv, buttonDiv];


            })()
        )

        Items.removeContent()        
    });

    Items.content(itemsListContainer);
};

renderItemsList()


