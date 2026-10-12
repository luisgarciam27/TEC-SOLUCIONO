import jsPDF from 'jspdf';
import { Quote, StoreConfig } from '../types';

export const generateQuotePdf = (quote: Quote, config: StoreConfig) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Primary colors
  const primaryColor = [11, 122, 117]; // #0B7A75
  const darkColor = [15, 34, 51]; // #0F2233
  const grayColor = [100, 100, 100];

  // Header Background bar
  doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Store Name / Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(config.storeName, 15, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`WhatsApp: ${config.whatsappNumber}`, 15, 28);

  // Quote Number Badge on Right
  doc.setTextColor(244, 180, 0); // Amber
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(quote.id, pageWidth - 15, 22, { align: 'right' });

  doc.setTextColor(200, 200, 200);
  doc.setFontSize(9);
  doc.text(`Fecha: ${new Date(quote.date).toLocaleDateString()}`, pageWidth - 15, 29, { align: 'right' });

  // Client Information Section
  let yPos = 55;
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('DATOS DEL CLIENTE', 15, yPos);

  yPos += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Cliente: ${quote.clientName}`, 15, yPos);
  doc.text(`Teléfono: ${quote.clientPhone}`, pageWidth / 2, yPos);

  yPos += 6;
  if (quote.clientEmail) {
    doc.text(`Correo: ${quote.clientEmail}`, 15, yPos);
  }
  doc.text(`Vigencia: ${quote.validDays || config.quoteValidityDays} días`, pageWidth / 2, yPos);

  // Table Header
  yPos += 20;
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(15, yPos, pageWidth - 30, 8, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('CANT', 20, yPos + 5.5);
  doc.text('DESCRIPCIÓN / PRODUCTO', 35, yPos + 5.5);
  doc.text('CATEGORÍA', 125, yPos + 5.5);
  doc.text('TOTAL (S/.)', pageWidth - 20, yPos + 5.5, { align: 'right' });

  // Table Items
  yPos += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);

  quote.items.forEach((item, index) => {
    if (yPos > 260) {
      doc.addPage();
      yPos = 20;
    }

    const itemTotal = item.price * item.quantity;
    doc.text(item.quantity.toString(), 20, yPos);
    doc.text(item.productName, 35, yPos, { maxWidth: 85 });
    doc.text(item.category, 125, yPos);
    doc.text(itemTotal.toFixed(2), pageWidth - 20, yPos, { align: 'right' });

    yPos += 10;
    // Hairline divider
    doc.setDrawColor(220, 220, 220);
    doc.line(15, yPos - 3, pageWidth - 15, yPos - 3);
  });

  // Totals Section
  yPos += 10;
  const subtotal = quote.total / (1 + config.igvRate / 100);
  const igv = quote.total - subtotal;

  doc.setFont('helvetica', 'normal');
  doc.text(`Subtotal:`, pageWidth - 70, yPos);
  doc.text(`S/. ${subtotal.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });

  yPos += 6;
  doc.text(`IGV (${config.igvRate}%):`, pageWidth - 70, yPos);
  doc.text(`S/. ${igv.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });

  yPos += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`TOTAL A PAGAR:`, pageWidth - 70, yPos);
  doc.text(`S/. ${quote.total.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });

  // Footer / Notes
  yPos += 25;
  if (yPos > 250) {
    doc.addPage();
    yPos = 30;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('Observaciones:', 15, yPos);

  yPos += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.text(quote.internalNotes || 'Ninguna observación adicional.', 15, yPos, { maxWidth: pageWidth - 30 });

  yPos += 15;
  doc.setDrawColor(200, 200, 200);
  doc.line(15, yPos, pageWidth - 15, yPos);

  yPos += 6;
  doc.text(config.pdfFooterMessage, 15, yPos, { maxWidth: pageWidth - 30, align: 'center' });

  // Save PDF
  doc.save(`${quote.id}_${quote.clientName.replace(/\s+/g, '_')}.pdf`);
};
