import { Form } from "./components/form/form.js";
import { database } from "./database.js";
import { Nav } from "./functionalities/navbar.js";
import { clientsDetails } from "./instances/clientsDetails/clientsDetails.js";
import { confirmDelete } from "./instances/clientsForm/clientsForm.js";
import { Clients } from "./instances/clientsModal/clientsModal.js";
import { expensesDetails } from "./instances/expensesDetails/expensesDetails.js";
import { Items } from "./instances/itemsModal/itemsModal.js";
import { ordersDetails } from "./instances/ordersDetails/ordersDetails.js";
import { addOrderForm } from "./instances/ordersForm/ordersForm.js";
import { Payments } from "./instances/paymentsModal/paymentsModal.js";


const navBtns = document.querySelectorAll('.nav-btn');
Nav(navBtns)






  


  document.body.appendChild(addOrderForm.render());
  document.body.appendChild(ordersDetails.render());  
  document.body.appendChild(clientsDetails.render());  
  document.body.appendChild(expensesDetails.render());  

  ordersDetails.render().appendChild(Payments.render())
  addOrderForm.render().appendChild(Items.render())
  addOrderForm.render().appendChild(Clients.render())
  console.log(database.expenses);   
