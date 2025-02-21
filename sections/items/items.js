import { Form } from "../../components/form/form.js";
import { ListItem } from "../../components/listItem/listItem.js";
import { database } from "../../database.js"
import { search } from "../../functionalities/search.js";
import { addItemForm, deleteItemBtn, itemUnitInput, setInputValues } from "../../instances/itemsForm/itemsForm.js";
import { setUnitTarget, Units } from "../../instances/unitsModal/unitsModal.js";

const itemsList = document.querySelector('.items-list');
const itemsSearchBar = document.querySelector('.items-search-bar');
const placeholderText = document.querySelector('.items-list .placeholder-text');
const selectSortType = document.querySelector('.sort-select');

const conditions = {
    inStock: item => item.stock > 0,
    outOfStock: item => item.stock === 0,
    expensive: item => item.price > 100,
    cheap: item => item.price <= 100
};

export const renderItems = (condition, sortMethod) => {

    const sortMethods = {
        byName: (a, b) => a.name.localeCompare(b.name),
        byStock: (a, b) => b.stock - a.stock,
        byPrice: (a, b) => b.price - a.price
    };


        itemsList.innerHTML = '';
        database.items.sort(sortMethods[sortMethod]).forEach(item => {
        if (!condition || condition(item)) {
            const itemsListItem = ListItem(itemsList, 
                `
                <div class='item-name-n-stock'>
                    <span><b>${item.name}</b></span>
                    <span>unit: ${item.unit}</span>
                </div>
                <div class='item-price'>SAR${item.price}</div>
                `
            );



            

            itemsListItem.addEventListener('click', ()=> {
                setInputValues(item);
                setUnitTarget(itemUnitInput)
                addItemForm.setData(item);
                 
            })
            Units.showBtn(itemUnitInput)

            addItemForm.showBtnPlus(itemsListItem, () => deleteItemBtn.style.display = 'block')


        }


    
    });



    if(itemsList.children.length === 0)
        itemsList.innerHTML = placeholderText.outerHTML


}



search(itemsSearchBar, renderItems);
selectSortType.addEventListener('change', event => renderItems('', event.target.value))
renderItems()



document.body.appendChild(addItemForm.render());
