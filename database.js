//Mock Database


export const database = {
  items: [],
  clients: [],
  invoices: [], 
  invoice_items: [],
  expenses: [],
  payments: [],
  units: [],
  payment_methods: [],
  expense_categories: [],

    addUnit(name) {
      const newUnit = {
        id: this.generateId(this.units),
        name
      };
      this.units.push(newUnit);
      return newUnit;
    },


    
    addExpenseCategory(name) {
      const newExpenseCategory = {
        id: this.generateId(this.expense_categories),
        name
      };
      this.expense_categories.push(newExpenseCategory);
      return newExpenseCategory;
    },

    addPaymentMethod(name) {
      const newPaymentMethod = {
        id: this.generateId(this.payment_methods),
        name
      };
      this.payment_methods.push(newPaymentMethod);
      return newPaymentMethod;
    },

    generateId(list) {
      return list.length > 0 ? Math.max(...list.map(item => item.id)) + 1 : 1;
    },


  addItem(name, unit, price, description){
      const item = {
          id: this.generateId(this.items),
          name,
          unit,
          price,
          description
      }

      this.items.push(item)
      return item
  },

  updateItem(id, updates){
      const item = this.items.find(item => item.id === id)
      Object.assign(item, updates)

      return item
  },


  removeItem(id){
      const item = this.items.find(item => item.id === id)
      const index = this.items.indexOf(item)
      if(item)
          this.items.splice(index, 1)     

      return item
  },


  
  addClient(company, name, address, phone, whatsapp, email, description){
      const client = {
          id: this.generateId(this.clients),
          company,
          name,
          address,
          phone,
          whatsapp, 
          email,
          description,
          invoices: [],
          getBalance(){
            return this.invoices.reduce((total, inv) => total + inv.getTotalAmount(), 0)
          },
          status: "active"
      }

      this.clients.push(client)
      return client;
  },

  updateClient(id, updates){
      const client = this.clients.find(client => client.id === id)
      if(client) Object.assign(client, updates)
      else return 'client not found';

      return client
  },


  removeClient(id){
      const client = this.clients.find(client => client.id === id)
      const index = this.clients.indexOf(client)
      if(client) this.clients.splice(index, 1)
      else return 'client not found'
  },
  
  
  addInvoice(client, date, description){
      const invoice = {
          id: 'INV' +  Date.now() + this.invoices.length,
          client,
          date: date || new Date().toISOString().split('T')[0],
          inv_items: [],
          getTotalAmount(){
          return this.inv_items.reduce((total, item) => total + item.total, 0)
           - this.payments.reduce((total, payment) => total + payment.amount, 0)
          },
          description,
          payments: [],
          getTotalPayment(){
              return this.payments.reduce((total, payment) => total + payment.amount, 0)
          },
          status: "pending"
      }

      client.invoices.push(invoice) 
      this.invoices.push(invoice)

      return invoice
  },

  updateInvoice(id, updates){
      
      const invoice = this.invoices.find(invoice => invoice.id === id)
      
      if(!invoice) return 'invoice not found' 
      Object.assign(invoice, updates);

      return invoice
  },


  removeInvoice(id){
      const invoice = this.invoices.find(invoice => invoice.id === id)
      const index = this.invoices.indexOf(invoice)
      const clientIndex = invoice.client.invoices.indexOf(invoice)
      if(!invoice) return 'invoice not found';
      invoice.client.invoices.splice(clientIndex, 1);
      this.invoices.splice(index, 1)
      
  },

  addInvoiceItem(invoiceId, item, quantity){
      const invoice = this.invoices.find(invoice => invoice.id === invoiceId)        
      const invItem = {...item}
      invoice.inv_items.push(Object.assign(invItem, 
          {quantity, total: quantity * item.price}));

      return invItem;
  },

  removeInvoiceItem(invoiceId, itemId){
    const invoice = this.invoices.find(invoice => invoice.id === invoiceId)        
    const item = invoice.inv_items.find(item => item.id === itemId);
    const index = invoice.inv_items.indexOf(item)

    if(!item) return 'item not found';
    invoice.inv_items.splice(index, 1);

},

  addPayment(invoiceId, amount) {
      const invoice = this.invoices.find(t => t.id === invoiceId);
      if (!invoice) return "Invoice not found";  
      const newPayment = {
        id: this.generateId(this.payments),
        invoice_id: invoiceId,
        amount,
        date: new Date().toISOString().split('T')[0]
      };
    
      this.payments.push(newPayment);
      invoice.payments.push(newPayment);
            
      if(invoice.status === 'pending') invoice.status = 'checked';        
      if(invoice.getTotalAmount() === 0) invoice.status = 'completed';  
    
      return newPayment;
    },

  
    removePayment(id){
      const payment = this.payments.find(payment => payment.id === id)
      const invoice = this.invoices.find(inv => inv.id === payment.invoice_id)
      const index = this.payments.indexOf(payment)
      const invoiceIndex = invoice.payments.indexOf(payment)
      if(!payment) return 'invoice not found';
      invoice.payments.splice(invoiceIndex, 1);
      this.payments.splice(index, 1)
    },
    
    
    // Function to add an expense
    addExpense(category, date, amount, payment_method, description,) {
      const newCategory = {
        id: this.generateId(this.expenses),
        date: date,
        category,
        description,
        amount,
        currency: "SAR",
        payment_method
      };
    
      this.expenses.push(newCategory);
      return newCategory;
    },
    
    
    // Function to update an expense
    updateExpense(id, updatedFields) {
      const expense = this.expenses.find(e => e.id === id);
      if (!expense) return "Expense not found";
      Object.assign(expense, updatedFields);
      return expense;
    },

  removeExpense(id) {
      const expense = this.expenses.find(expense => expense.id === id);
      const index = this.expenses.indexOf(expense);
      if (!expense) return 'Expense not found';
      this.expenses.splice(index, 1);
      return expense;
  }


};



    

database.addItem('HP Envy 2024', 'laptop', 2500, 'Favorite Laptop')
database.addItem('Apple MacBook Air 2024', 'laptop', 4000, 'Decent Laptop')
database.addItem('Apple MacBook Air 2024', 'laptop', 4000, 'Decent Laptop')

database.updateItem(3, {name: 'Apple MacBook Air 2023', price: 3000})
database.addClient('Rolex', 'Jane Roe', 'Paris G St.', '+33551426497',  '+33551426497', 'janeroe@rolex.com', 'Notes');
database.addClient('BVLGARI', 'John Doe', 'Milan Via Montenapoleone', '+39551426497',  '+39551426497', 'johndoe@bvlgari.com', 'Notes');
database.addClient('Cartier', 'Sara Lee', 'London Bond St.', '+44551426497',  '+44551426497', 'saralee@cartier.com', 'Notes');
database.addClient('Tudor', 'John Smith', 'Geneva Quai des Bergues', '+41551426497 ', '+41551426497', 'johnsmith@tudor.com', 'Notes');


database.addInvoice(database.clients[3], '2025-02-02', 'Notes')
database.addInvoice(database.clients[3], '2025-02-02', '')
database.addInvoiceItem(database.invoices[1].id, database.items[2], 4); 


database.addInvoiceItem(database.invoices[0].id, database.items[2], 4); 
database.addInvoiceItem(database.invoices[0].id, database.items[1], 1); 
database.addInvoiceItem(database.invoices[0].id, database.items[0], 2);


database.addPayment(database.invoices[0].id, 100)


database.addInvoice(database.clients[2], '2025-03-03', 'Additional Notes 1');
database.addInvoice(database.clients[1], '2025-04-04', 'Additional Notes 2');
database.addInvoice(database.clients[0], '2025-05-05', 'Additional Notes 3');



database.addInvoiceItem(database.invoices[0].id, database.items[2], 4); 
database.addInvoiceItem(database.invoices[1].id, database.items[1], 1); 
database.addInvoiceItem(database.invoices[2].id, database.items[0], 2);
database.addInvoiceItem(database.invoices[3].id, database.items[1], 3);
database.addInvoiceItem(database.invoices[4].id, database.items[0], 5);


database.addExpense('Salary',' 2025-02-02', 10000, 'Credit Card', 'Monthly Salary');
database.addExpense('Rent',' 2025-02-05',5000, 'Cash', 'Monthly Rent');
database.addExpense('Utilities',' 2025-02-10', 1000, 'Cash', 'Monthly Utilities' ,);
database.addExpense('Utilities',' 2025-02-10', 1000, 'Cash', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum');

database.addExpenseCategory('Salary')
database.addExpenseCategory('Rent')
database.addExpenseCategory('Utilities')
database.addExpenseCategory('Marketing')
database.addExpenseCategory('Raw Materials')
database.addExpenseCategory('Taxes')

database.addPaymentMethod('Credit Card')
database.addPaymentMethod('Cash')
database.addPaymentMethod('Bank Transfer')


database.addUnit('piece')
database.addUnit('kg')
database.addUnit('liter')
database.addUnit('meter')



database.addPayment(database.invoices[0].id, 30000)
database.addPayment(database.invoices[1].id, 13000)
database.addPayment(database.invoices[2].id, 5000)
database.addPayment(database.invoices[3].id, 12000)
console.log(database.invoices) 


