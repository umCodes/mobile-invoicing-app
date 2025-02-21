import { ListItem } from "../../components/listItem/listItem.js";
import { Modal } from "../../components/modal/modal.js";
import { database } from "../../database.js";
import { addOrderForm, orderClient } from "../ordersForm/ordersForm.js";


export const Clients = new Modal('modal');
const clients = database.clients;

let target;

export const setClientTarget = (t) => target = t;

const inputClient = (client)=> {
    target.value = client;
}





export const renderClientsList = () => {
    const clientsListContainer = document.createElement('div');
    clientsListContainer.id = 'clients-list';
    clientsListContainer.innerHTML = '';

    clients.forEach(client => {
        ListItem(clientsListContainer, client.name)
        .addEventListener('click', () => {
            orderClient.client = client;
            console.log(orderClient)
            inputClient(client.name);
            Clients.hide();
        });

        Clients.removeContent()        
    });

    Clients.content(clientsListContainer);
};
renderClientsList()



