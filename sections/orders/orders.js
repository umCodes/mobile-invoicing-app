// import { Form } from "../../components/form/form.js";
import { ListItem } from "../../components/listItem/listItem.js";
import { database } from "../../database.js"
import { search } from "../../functionalities/search.js";
import { ordersDetails, showContent } from "../../instances/ordersDetails/ordersDetails.js";
import { addOrderForm, setInputValues } from "../../instances/ordersForm/ordersForm.js";
import { Payments } from "../../instances/paymentsModal/paymentsModal.js";

const ordersList = document.querySelector('.orders-list');
const ordersSearchBar = document.querySelector('.orders-search-bar');
const placeholderText = document.querySelector('.orders-list .placeholder-text');
const selectSortType = document.querySelector('.sort-orders');

const conditions = {
    inStock: order => order.stock > 0,
    outOfStock: order => order.stock === 0,
    expensive: order => order.price > 100,
    cheap: order => order.price <= 100
};




export const renderOrders = (condition, sortMethod) => {

    const sortMethods = {
        byName: (a, b) => a.client.name.localeCompare(b.client.name),
        byDate: (a, b) =>
             Number((b.date).replace(/[^0-9]/g, '')) - Number((a.date).replace(/[^0-9]/g, ''))
        ,
        byAmount: (a, b) => b.getTotalAmount() - a.getTotalAmount()
    };




        ordersList.innerHTML = '';
        database.invoices.sort(sortMethods[sortMethod]).forEach(order => {
        if (!condition || condition(order)) {
            const ordersListItem = ListItem(ordersList, 
                `
                <div class='order-id-n-client'>
                    <h3>${order.id}</h3>
                    <span>${order.date}</span>
                    <span><b>${order.client.name}</b></span>
                </div>
                <div class='order-amount'>
                    <span data-text="${order.status}" class="status">${order.status}</span>
                    <span class="amount">SAR${order.getTotalAmount()}</span>
                </div>
                `
            );


            ordersListItem.addEventListener('click', ()=> {
                ordersDetails.setData(order);
                showContent()
                
                setInputValues(order);
                ordersDetails.showDetails()
                
            })


        }


    
    });


    
    if(ordersList.children.length === 0)
        ordersList.innerHTML = placeholderText.outerHTML


}



search(ordersSearchBar, renderOrders);
selectSortType.addEventListener('change', event => renderOrders('', event.target.value))
renderOrders()



