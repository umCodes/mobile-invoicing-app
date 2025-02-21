import { ListItem } from "../../components/listItem/listItem.js";
import { Modal } from "../../components/modal/modal.js";
import { database } from "../../database.js";
import { addItemBtn, addItemForm, itemUnitInput } from "../itemsForm/itemsForm.js";


export const Units = new Modal('modal');
const units = database.units;

let target;

export const setUnitTarget = (t) => target = t;

const inputUnit = (unit)=> {
    target.value = unit;
}






const renderUnitsList = () => {
    const unitsListContainer = document.createElement('div');
    unitsListContainer.id = 'units-list';
    unitsListContainer.innerHTML = '';

    units.forEach(unit => {
        ListItem(unitsListContainer, unit.name)
        .addEventListener('click', () => {
            inputUnit(unit.name);
            Units.hide();
        });

        Units.removeContent()        
    });

    Units.content(unitsListContainer);
};
renderUnitsList()


Units.addItemBtn.addEventListener('click', () => {

    
    if(Units.addItemInput.value.trim()){
        database.addUnit(Units.addItemInput.value.trim())
        //----------Backend-functions
        renderUnitsList()
    }
})


