// import { Form } from "../../components/form/form.js";
import { ListItem } from "../../components/listItem/listItem.js";
import { database } from "../../database.js"
import { search } from "../../functionalities/search.js";
import { clientsDetails, showContent } from "../../instances/clientsDetails/clientsDetails.js";
import { addClientForm } from "../../instances/clientsForm/clientsForm.js";

const clientsList = document.querySelector('.clients-list');
const clientsSearchBar = document.querySelector('.clients-search-bar');
const placeholderText = document.querySelector('.clients-list .placeholder-text');
const selectSortType = document.querySelector('.sort-clients');

const conditions = {
    inStock: client => client.stock > 0,
    outOfStock: client => client.stock === 0,
    expensive: client => client.price > 100,
    cheap: client => client.price <= 100
};

export const renderClients = (condition, sortMethod) => {

    const sortMethods = {
        byName: (a, b) => a.name.localeCompare(b.name),
        byBalance: (a, b) => b.getBalance() - a.getBalance()
    };




        clientsList.innerHTML = '';
        database.clients.sort(sortMethods[sortMethod]).forEach(client => {
        if (!condition || condition(client)) {
            
            const clientsListItem = ListItem(clientsList, 
                `
                <div class='client-name-n-email'>
                    <span><b>${client.name}</b></span>
                    <span>${client.email}</span>
                </div>
                <div class='client-balance'>
                    <span><b>Balance</b></span>
                    <span>SAR${client.getBalance()}</span>
                </div>
                `
            );

            clientsListItem.addEventListener('click', () => {
                clientsDetails.setData(client);
                clientsDetails.showDetails();
                showContent();

            })

        }


    
    });


    
    if(clientsList.children.length === 0)
        clientsList.innerHTML = placeholderText.outerHTML


}



search(clientsSearchBar, renderClients);
selectSortType.addEventListener('change', event => renderClients('', event.target.value))
renderClients()




