import { Form } from "../../components/form/form.js";
import { database } from "../../database.js";
import { renderItems } from "../../sections/items/items.js";
import { alertMessage } from "../../components/alert/alert.js";
import { confirmModal } from "../../components/confirm/confirm.js";
import { setUnitTarget, Units } from "../unitsModal/unitsModal.js";



export const addItemForm = new Form('', 'addItemForm');




export const itemNameInput = addItemForm.input(
    'itemName',
    'text',
    '<i class="fa-solid fa-tag"></i>',
    true //required
)

itemNameInput.placeholder = 'Item Name'

export const itemUnitInput = addItemForm.input(
        'itemUnit',
        'text',
        '<i class="fa-solid fa-box"></i>'
) 

itemUnitInput.placeholder = 'Unit'
itemUnitInput.readOnly = true;
setUnitTarget(itemUnitInput)


export const itemPriceInput = addItemForm.input(
        'itemPrice',
        'number',
        '<i class="fa-solid fa-dollar-sign"></i>',
        true //required

)

itemPriceInput.placeholder = '0.00 (price)'

export const itemDescriptionArea = addItemForm.textarea(
    'itemDescription',
    '<i class="fa-solid fa-note-sticky"></i>'
)

itemDescriptionArea.placeholder = 'Description'


export const setInputValues = (item) => {
    itemNameInput.value = item.name || '';
    itemUnitInput.value = item.unit || '';
    itemPriceInput.value = item.price || '';
    itemDescriptionArea.value = item.description || '';
}




    
const confirmDelete = new confirmModal('Cancel', 'Delete');

confirmDelete.bodyContent(
    `
    <h3>This item will deleted</h3>
    <p>Are you want to continue?</p>
    `
)


confirmDelete.buttonsAction(() => confirmDelete.hide(),
    () => {  
        
        confirmDelete.hide()
        addItemForm.cancel.click()
        let index = database.items.indexOf(addItemForm.getData())


        alertMessage('Item deleted', 'delete');
        setTimeout(() => {
                renderItems()
            }, 500)
        
            database.items.splice(index, 1);
    })


   

export const deleteItemBtn =  addItemForm.button(
    `<i class="fa-solid fa-trash"></i> Delete Item`,
    'delete-item-btn',
    () => confirmDelete.show()
)



addItemForm.saveAction(
    event => {
        event.preventDefault();       

        const item = addItemForm.getData();
        if(itemNameInput.value && itemPriceInput.value){
            !item
            ?
            //Adds an Item:
            database.addItem(
                itemNameInput.value, //Name
                itemUnitInput.value, //Unit
                Number(itemPriceInput.value), //Price
                itemDescriptionArea.value, //Description
            )
            :
            //Updates Existing Item:
            database.updateItem(item.id, {
                name: itemNameInput.value, //Name
                price: Number(itemPriceInput.value), //Price
                unit: itemUnitInput.value, //Unit
                description: itemDescriptionArea.value //Description
            })
            addItemForm.cancel.click()
            alertMessage('Item Added Successfully', 'success');
        }
        else
            alertMessage('Required Feilds not filled', 'warning');
       

        renderItems()

    }
)



export const addItemBtn = document.querySelector('.add-item-btn')
addItemForm.showBtnPlus(addItemBtn, () => 
    deleteItemBtn.style.display = 'none'

);


document.body.appendChild(confirmDelete.render())
addItemForm.render().appendChild(Units.render())


