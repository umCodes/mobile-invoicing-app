const { jsPDF } = window.jspdf;

export function generatePDF(client, order) {
    console.log(client, order);
    
    const { company, address, phone, email, name } = client;
    const { id, date, inv_items, getTotalPayment, payments, getTotalAmount } = order;
    
    // Calculate payments and balance amounts
    
    const totalPayments = order.getTotalPayment().toFixed(2);
    const balance = order.getTotalAmount().toFixed(2);
    const grandTotal = (parseFloat(balance) + parseFloat(totalPayments)).toFixed(2);

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 150], // Width: 80mm, Height: 150mm
    });
    const margin = 5; // Adjusted margin for the content

    // Add logo
    const logoUrl = "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png";
    doc.addImage(logoUrl, "PNG", 0, margin, 53.33 * 0.75, 26.66 * 0.75); // Scale down the image

    // Business and Contact Information
    doc.setFontSize(8);
    doc.text(`Invoice issued for: ${name} form ${company}`, margin, 35);
    doc.text(address, margin, 40);
    doc.text(`Phone: ${phone}`, margin, 45);
    doc.text(`Email: ${email}`, margin, 50);

    // Invoice Header
    doc.setFontSize(8);
    doc.text(`Invoice #: ${id}`, margin, 60);
    doc.text(`Invoice Date: ${date}`, margin, 65);
    
    // Table Header
    doc.setFont("helvetica", "bold");
    const startY = 75;
    const headers = ["#", "Title", "Price", "Qty", "Unit", "Total"];
    doc.setFontSize(6);
    let x = margin;
    let y = startY;

    doc.setFillColor(36, 36, 36);
    doc.rect(margin - 2, y + 1, 70, 6, "F");
    doc.setTextColor(255, 255, 255);

    headers.forEach((header, index) => {
            if(header === 'Title')
                doc.text(header, x + (index * 4), y + 5);
            else
                doc.text(header, x + (index * 12), y + 5);
    });

    // Table Content
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    y += 10;
    inv_items.forEach((item, index) => {
        doc.text((index + 1).toString(), x + 0, y);
        const itemName = doc.splitTextToSize(item.name, 12);
        doc.text(itemName, x + 4, y);
        const itemPrice = doc.splitTextToSize('SAR\n' + item.price, 6);
        doc.text(itemPrice, x + 24, y);
        doc.text(item.quantity.toString(), x + 38, y);
        doc.text(item.unit, x + 48, y);
        const itemTotal = doc.splitTextToSize('SAR\n' + item.total, 6);

        doc.text(itemTotal, x + 60, y);
        y += 8;
    });

    // Additional Rows for Payments, Balance, and Total
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    y += 10;
    doc.text(`Total: SAR${grandTotal}`, x, y);
    y += 5;
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text(`Payments: -SAR${totalPayments}`, x+2, y);
    y += 5;
    doc.text(`Balance: SAR${balance}`, x+2, y);

    // Footer Text
    y += 15;
    doc.setFontSize(6);
    doc.text("This is a computer generated invoice. No signature is required.", margin, y);

    // Save the PDF
    doc.save(`${company} - ${id}.pdf`);
}


