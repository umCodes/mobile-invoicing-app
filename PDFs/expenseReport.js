
const { jsPDF } = window.jspdf;
const { autoTable } = jsPDF;


export const generateExpenseReport  = (expense) => {
    // Set receipt size (80mm width, auto height)
    const doc = new jsPDF({
      unit: "mm",
      format: [80, 120], // Small receipt format
    });
  
    // Title
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Expense Receipt", 10, 10);
  
    // Line separator
    doc.setLineWidth(0.3);
    doc.line(10, 12, 70, 12);
  
    // Define layout positions
    const startX = 10;
    let currentY = 18;
    const rowHeight = 6;
    const col1Width = 30; // Label width
    const col2Width = 35; // Value width
  
    // Expense fields (excluding description)
    const fields = [
      ["ID", expense.id],
      ["Date", expense.date],
      ["Amount", `${expense.amount} ${expense.currency}`],
      ["Category", expense.category],
      ["Payment", expense.payment_method],
    ];
  
    fields.forEach(([label, value]) => {
      // Label Cell (Dark background, white text)
      doc.setFillColor(40, 40, 40); // Dark gray
      doc.setTextColor(255, 255, 255); // White text
      doc.rect(startX, currentY, col1Width, rowHeight, "F");
      doc.setFontSize(9);
      doc.text(label, startX + 2, currentY + 4.5);
  
      // Value Cell (White background, black text)
      doc.setFillColor(255, 255, 255); // White background
      doc.setTextColor(0, 0, 0); // Black text
      doc.rect(startX + col1Width, currentY, col2Width, rowHeight, "F");
      doc.text(String(value), startX + col1Width + 2, currentY + 4.5);
  
      currentY += rowHeight; // Move to next row
    });
  
    // Handle multi-line description
    let descLines = doc.splitTextToSize(expense.description, col2Width - 4); // Wrap text
    let descHeight = rowHeight * descLines.length; // Adjust height based on lines
  
    // Description Label
    doc.setFillColor(40, 40, 40);
    doc.setTextColor(255, 255, 255);
    doc.rect(startX, currentY, col1Width, descHeight, "F");
    doc.text("Description", startX + 2, currentY + 4.5);
  
    // Description Value (Multiline)
    doc.setFillColor(255, 255, 255);
    doc.setTextColor(0, 0, 0);
    doc.rect(startX + col1Width, currentY, col2Width, descHeight, "F");
    doc.text(descLines, startX + col1Width + 2, currentY + 4.5);
  
    currentY += descHeight + 5; // Space after description
  
    // Footer
    doc.setFontSize(9);
    doc.text("Thank you!", 30, currentY);
  
    // Save the PDF
    doc.save(`Receipt_${expense.id}.pdf`);
  };


  