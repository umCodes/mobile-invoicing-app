import { alertMessage } from "../../components/alert/alert.js";
import { confirmModal } from "../../components/confirm/confirm.js";
import { DetailSection } from "../../components/details/details.js";
import { database } from "../../database.js";
import { renderClients } from "../../sections/clients/clients.js";
import { addClientForm, deleteClientBtn, setInputValues } from "../clientsForm/clientsForm.js";



export const clientsDetails = DetailSection();










export const showContent = () =>{

    const content = clientsDetails.getContent();
    if (content)
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }

    const client = clientsDetails.getData();
    clientsDetails.setHeader(client.name)


    clientsDetails.addContent((() => {
        const clientCard = document.createElement('div');
        clientCard.className = 'client-card';

        const clientInfo = document.createElement('div');
        clientInfo.className = 'client-info';

        clientInfo.innerHTML = 
        `
            <div class='profile-icon'>
                <i class="fas fa-user"></i> 
            </div>
            <div class='client-data'>
            
                <h2>
                    ${client.name || ''}
                </h2>
                <span class="status" data-text="${client.status}">${client.status || ''}</span>
                <p>${client.company || ''}</p>
                <p>${client.email || ''}</p>
                <div class='balance'>
            </div>
            
            </div>
        `;


        
        const clientBalance = document.createElement('div');
        clientBalance.className = 'client-balance';

        clientBalance.innerHTML = 
        `
        
            <span>Balance: 
                <b>SAR${client.getBalance()}</b> 
            </span>
            
        `


        

        clientCard.appendChild(clientInfo)
        clientCard.appendChild(clientBalance)
        return clientCard;
    })())

    clientsDetails.addContent((() => {
        
        const contact = document.createElement('div');
        contact.className = 'client-contact'
        
        const phone = document.createElement('div');
        phone.className = 'phone'
        phone.innerHTML = `<i class="fas fa-phone"></i> ${client.phone || ''}`
        phone.addEventListener('click', () => window.open(`tel:${client.phone}`))
        
        const whatsApp = document.createElement('div');
        whatsApp.className = 'whatsapp'
        whatsApp.innerHTML = `<i class="fab fa-whatsapp"></i> ${client.whatsapp || ''}`
        whatsApp.addEventListener('click', () => {
            const phoneNumber = client.whatsapp.replace(/[^\d]/g, "");
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const whatsappUrl = isMobile 
                ? `https://api.whatsapp.com/send?phone=${phoneNumber}`
                : `https://web.whatsapp.com/send?phone=${phoneNumber}`;
            window.open(whatsappUrl);
        })

        if(client.phone)
            contact.appendChild(phone)

        if(client.whatsapp)
            contact.appendChild(whatsApp)
        
        return contact;
    })())

    clientsDetails.addContent((()=>{
        const address = document.createElement('div');
        address.className = 'client-address';
        address.innerHTML = `
            <h3>Address</h3>
            <p>${client.address || 'No address available'}</p>
        `;
        return address;
    })())

    clientsDetails.addContent((()=>{
        const actions = document.createElement('div');
        actions.className = 'client-actions';
        const editButton = document.createElement('button');
        editButton.className = 'action-button edit-btn';
        editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
        editButton.addEventListener('click', () =>{ 
            setInputValues(client);
            addClientForm.setData(client);
            
        });

        addClientForm
        .showBtnPlus(editButton, () => 
            deleteClientBtn.style.display = 'block')



            
        actions.appendChild(editButton);

        return actions;
    })());

    clientsDetails.addContent((()=>{
        const invoices = document.createElement('div');
        invoices.className = 'client-invoices';
        invoices.innerHTML = '<h3>Transactions</h3>';

        const invoicesList = document.createElement('div');
        invoicesList.className = 'orders-list';

        database.invoices.forEach(invoice => {
            
            if(client.invoices.some(inv => inv.id === invoice.id)){
                const invoiceItem = document.createElement('div');
                invoiceItem.className = 'list-item';
                invoiceItem.innerHTML = `
                    <div class='order-id-n-client'>
                    <h3>${invoice.id}</h3>
                    <span>${invoice.date}</span>
                    </div>
                    <div class='order-amount'>
                        <span data-text="${invoice.status}" class="status">${invoice.status}</span>
                        <span class="amount"><b>SAR${invoice.getTotalAmount()}</b></span>
                    </div>
                    `;
                invoicesList.appendChild(invoiceItem);
            }
        });

        invoices.appendChild(invoicesList);
        return invoices;
    })());
}


