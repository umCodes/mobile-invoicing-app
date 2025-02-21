import { database } from "../../database.js";

const { jsPDF } = window.jspdf;
const { autoTable } = jsPDF;



const invoices = database.invoices;
console.log(database.payments[0]);


export function generateSalesReport(database) {
    const doc = new jsPDF();
    let totalSales = 0;
    let totalPayments = 0;
    
    doc.setFontSize(16);
    doc.text("Sales Report", 10, 10);
    doc.setFontSize(12);
    

    let y = 50; // Starting position for text

    doc.setFillColor(211, 211, 211); // Light gray
    doc.rect(8, 43, 200, 16, "F");
    doc.setTextColor(0, 0, 0);



    doc.text("Invoice ID", 10, y + 2);
    doc.text("Client", 60, y + 2);
    doc.text("Date", 90, y + 2);
    doc.text("Remaining\n Amount", 120, y);
    doc.text("Recieved\n Payments", 150, y);
    doc.text("Total\n Amount", 180, y);
    y += 20;

    database.invoices.forEach((invoice, index) => {
        const { id, date, client } = invoice;
        const totalAmount = invoice.getTotalAmount();
        const invTotalPayments = invoice.getTotalPayment();

    if(invoice.status !== 'pending')    
    {  
        totalSales += totalAmount;
        totalPayments += invTotalPayments;
        
        const invId = doc.splitTextToSize(`${id}`, 40);
        doc.text(invId, 10, y);
        const invClient = doc.splitTextToSize(`${client.name}`, 20);
        doc.text(invClient, 60, y);
        const invDate = doc.splitTextToSize(`${date}`, 25);
        doc.text(invDate, 90, y);
        const invTotalAmount = doc.splitTextToSize(`SAR\n${totalAmount.toFixed(2)}`, 40);
        doc.text(invTotalAmount, 120, y);
        const totalPaymentsR = doc.splitTextToSize(`SAR\n${invTotalPayments.toFixed(2)}`, 40);
        doc.text(totalPaymentsR, 150, y);
        const invTotal = doc.splitTextToSize(`SAR\n${(totalAmount + invTotalPayments).toFixed(2)}`, 40);
        doc.text(invTotal, 180, y);
        
        y += 10;
    }
    });
    

    doc.setFont('helvetica', 'bold');
    doc.text(`Total: `, 10, y + 10);
    doc.setFont('helvetica', 'normal');
    doc.text(`SAR\n${totalSales}`, 120, y + 10);
    doc.text(`SAR\n${invoices.reduce((total, inv) => total + inv.getTotalPayment(), 0).toFixed(2)}`, 150, y + 10);
    doc.text(`SAR\n${(totalSales + invoices.reduce((total, inv) => total + inv.getTotalPayment(), 0)).toFixed(2)}`, 180, y + 10);
    
    doc.save("sales_report.pdf");
}




export function generateExpensesReport(database) {
    const doc = new jsPDF();
    let totalExpenses = 0;
    
    doc.setFontSize(16);
    doc.text("Expenses Report", 10, 10);
    doc.setFontSize(12);
    

    let y = 50; // Starting position for text

    doc.setFillColor(211, 211, 211); // Light gray
    doc.rect(8, 43, 200, 16, "F");
    doc.setTextColor(0, 0, 0);



    doc.text("ID", 10, y + 2);
    doc.text("Category", 30, y + 2);
    doc.text("Date", 60, y + 2);
    doc.text("Description", 90, y+2);
    doc.text("Payment\n Method", 150, y);
    doc.text("Amount", 180, y+2);
    y += 20;

    database.expenses.forEach((expenses, index) => {
        const { id, date, category, description, amount, payment_method } = expenses;
        

        totalExpenses += amount;
        
        const expenseId = doc.splitTextToSize(`${id}`, 10);
        doc.text(expenseId, 10, y);
        const expenseCategory = doc.splitTextToSize(`${category}`, 20);
        doc.text(expenseCategory, 30, y);
        const expenseDate = doc.splitTextToSize(`${date}`, 25);
        doc.text(expenseDate, 60, y);
        const expenseDescription = doc.splitTextToSize(`${description}`, 40);
        doc.text(expenseDescription, 90, y);
        const expensePaymentMethod = doc.splitTextToSize(`${payment_method}`, 40);
        doc.text(expensePaymentMethod, 150, y);
        const expenseAmount = doc.splitTextToSize(`SAR\n${(amount).toFixed(2)}`, 40);
        doc.text(expenseAmount, 180, y);
        
        y += 10;
    });

    

    doc.setFont('helvetica', 'bold');
    doc.text(`Total: `, 10, y + 10);
    doc.setFont('helvetica', 'normal');
    doc.text(`SAR\n${totalExpenses}`, 180, y + 10);

    doc.save("expenses_report.pdf");
}


export function generatePaymentsReport(database) {
    const doc = new jsPDF();
    let totalPayments = 0;
    
    doc.setFontSize(16);
    doc.text("Payments Report", 10, 10);
    doc.setFontSize(12);
    

    let y = 50; // Starting position for text

    doc.setFillColor(211, 211, 211); // Light gray
    doc.rect(8, 43, 200, 16, "F");
    doc.setTextColor(0, 0, 0);



    doc.text("ID", 10, y + 2);
    doc.text("Invoice", 30, y + 2);
    doc.text("Date", 120, y+2);
    doc.text("Amount", 180, y+2);
    y += 20;

    database.payments.forEach((payment, index) => {
        const { id, invoice_id, date, amount } = payment;
        

        totalPayments += amount;
        
        const paymentId = doc.splitTextToSize(`${id}`, 10);
        doc.text(paymentId, 10, y);
        const paymentInvId = doc.splitTextToSize(`${invoice_id}`, 50);
        doc.text(paymentInvId, 30, y);
        const paymentDate = doc.splitTextToSize(`${date}`, 40);
        doc.text(paymentDate, 120, y);
        const paymentAmount = doc.splitTextToSize(`SAR\n${(amount).toFixed(2)}`, 40);
        doc.text(paymentAmount, 180, y);
        
        y += 10;
    });

    

    doc.setFont('helvetica', 'bold');
    doc.text(`Total: `, 10, y + 10);
    doc.setFont('helvetica', 'normal');
    doc.text(`SAR\n${totalPayments}`, 180, y + 10);

    doc.save("payment_report.pdf");
}


const totalSales = document.querySelector('.total-sales');
const totalExpenses = document.querySelector('.total-expenses');
const totalReceivedPayments = document.querySelector('.total-received-payments');

const totalAmount = database.invoices.reduce((total, inv) => total + inv.getTotalAmount(), 0);
const totalReceived = database.payments.reduce((total, payment) => total + payment.amount, 0);
const totalExp = database.expenses.reduce((total, exp) => total + exp.amount, 0);

totalSales.innerHTML += `<b>SAR${(totalAmount + totalReceived).toFixed(2)}</b>`;
totalExpenses.innerHTML += `<b>SAR${totalExp.toFixed(2)}</b>`;
totalReceivedPayments.innerHTML += `<b>SAR${totalReceived.toFixed(2)}</b>`;






const totalSalesIcon = document.querySelector('.total-sales-icon');
const totalExpensesIcon = document.querySelector('.total-expenses-icon');
const totalReceivedPaymentsIcon = document.querySelector('.total-received-payments-icon');

totalSalesIcon.addEventListener('click', () => generateSalesReport(database));
totalExpensesIcon.addEventListener('click', () => generateExpensesReport(database));
totalReceivedPaymentsIcon.addEventListener('click', () => generatePaymentsReport(database));
