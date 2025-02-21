import { Form } from "../../components/form/form.js";
import { database } from "../../database.js";
import { renderClients } from "../../sections/clients/clients.js";
import { alertMessage } from "../../components/alert/alert.js";
import { confirmModal } from "../../components/confirm/confirm.js";
import { clientsDetails } from "../clientsDetails/clientsDetails.js";



export const addClientForm = new Form('', 'addClientForm');




export const clientCompanyInput = addClientForm.input(
    'clientCompany',
    'text',
    '<i class="fas fa-building"></i>',
    false //required
)

clientCompanyInput.placeholder = 'Client Company';

export const clientNameInput = addClientForm.input(
    'clientName',
    'text',
    '<i class="fas fa-user"></i>',
    true//required
)

clientNameInput.placeholder = 'Client Name';

export const clientEmailInput = addClientForm.input(
        'clientEmail',
        'text',
        '<i class="fas fa-envelope"></i>'
) 

clientEmailInput.placeholder = 'user@example.com'


export const clientPhoneInput = addClientForm.input(
        'clientPhone',
        'number',
        '<i class="fas fa-phone"></i>',
        true //required

)

clientPhoneInput.placeholder = 'Enter phone number'


export const clientWAInput = addClientForm.input(
    'clientWA',
    'number',
    '<i class="fab fa-whatsapp"></i>',
    false // required
);
clientWAInput.placeholder = 'Enter phone number';
export const clientAddressInput = addClientForm.input(
    'clientAddress',
    'text',
    '<i class="fas fa-address-card"></i>',
    false // required
);
clientAddressInput.placeholder = 'Address';

export const clientNotesArea = addClientForm.textarea(
    'clientNotes',
    '<i class="fas fa-sticky-note"></i>'
);
clientNotesArea.placeholder = 'Additional notes...';

export const setInputValues = (client) => {
    clientCompanyInput.value = client.company || '';
    clientNameInput.value = client.name || '';
    clientEmailInput.value = client.email || '';
    clientPhoneInput.value = Number((client.phone + '').replace(/\D/g, '')) || '';
    clientWAInput.value = Number((client.whatsapp + '').replace(/\D/g, '')) || '';
    clientAddressInput.value = client.address || '';
    clientNotesArea.value = client.notes || '';
}




    
export const confirmDelete = new confirmModal('Cancel', 'Delete');

confirmDelete.bodyContent(
    `
        <h3>Client will be deleted this cannot be undone</h3>
        <p>Are you sure you want to continue?</p>
    `
)



confirmDelete.buttonsAction(
    () => 
        confirmDelete.hide(),
        () => {
            confirmDelete.hide()
            database.removeClient(addClientForm.getData().id)
            alertMessage(`Client ${addClientForm.getData().name} Deleted`, 'delete');
            addClientForm.cancel.click()
            clientsDetails.hideDetails()
            renderClients()
        }
)



   

export const deleteClientBtn =  addClientForm.button(
    `<i class="fa-solid fa-trash"></i> Delete Client`,
    'delete-client-btn',
    () => confirmDelete.show()
)



addClientForm.saveAction(
    event => {
        event.preventDefault();       

        const client = addClientForm.getData();
        if(clientNameInput.value && clientPhoneInput.value){
            !client
            ?
            //Adds an Client:
            database.addClient(
                clientCompanyInput.value, // Company
                clientNameInput.value, // Name
                clientAddressInput.value, // Address
                Number(clientPhoneInput.value), // Phone
                Number(clientWAInput.value), // WhatsApp
                clientEmailInput.value, // Email
                clientNotesArea.value // Notes
            )
            :
            //Updates Existing Client:
            database.updateClient(client.id, {
                name: clientNameInput.value, // Name
                email: clientEmailInput.value, // Email
                phone: Number(clientPhoneInput.value), // Phone
                address: clientAddressInput.value, // Address
                notes: clientNotesArea.value, // Notes
                company: clientCompanyInput.value, // Company
                whatsapp: Number(clientWAInput.value) // WhatsApp
            })

            addClientForm.cancel.click()
            alertMessage('Client Added Successfully', 'success');
        }
        else
            alertMessage('Required Feilds not filled', 'warning');
       

        renderClients()

    }
)



export const addClientBtn = document.querySelector('.add-client-btn')
addClientForm.showBtnPlus(addClientBtn, () => 
    deleteClientBtn.style.display = 'none'

);


document.body.appendChild(confirmDelete.render())
document.body.appendChild(addClientForm.render());
