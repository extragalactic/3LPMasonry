import fs from 'fs';
import PDFKit from 'pdfkit';
import path from 'path';

const pdfKitCreateEstimatePreview = (customer) => {
    console.log(customer)
  const myDoc = new PDFKit({
    size: 'LETTER',
  });
  myDoc.pipe(fs.createWriteStream(path.join(__dirname, '../../documents/estimate.pdf')));
  myDoc.fontSize(28);
  myDoc.text('Three Little Pigs Masonry', 80, 45, {
    width: 700,
    align: 'left',
  });
  myDoc.fontSize(32);
  myDoc.text('Estimate', 250, 95);
  myDoc.image(path.join(__dirname, '../../browser/src/assets/images/logo.png'), {
    width: 200,
    height: 200,
    x: 400,
    y: 0,
  });

  myDoc.fontSize(12);
  myDoc.text('ThreeLittlePigsMasonry 14845 YongeSt., Unit6-Suite322, Aurora, ON, L4G 6H8 905-508-0500 416-595-0100', 4, 765, {
    width: 700,
    height: 5,
    align: 'left',
  });


  myDoc.fontSize(16);
  myDoc.text(`Prepared for: ${customer.firstName} ${customer.lastName}`, 2, 200, {
    width: 700,
    height: 5,
    align: 'left',
  });

  myDoc.fontSize(16);
  myDoc.text(`Customer Address: ${customer.address}`, 2, 220, {
    width: 700,
    height: 5,
    align: 'left',
  });

  myDoc.fontSize(16);
  myDoc.text(`Phone ${customer.cphone}`, 2, 220, {
    width: 700,
    height: 5,
    align: 'left',
  });



  myDoc.moveTo(306, 0)
    .lineTo(306, 792)
    .lineWidth(1)
    .stroke();
  myDoc.moveTo(0, 206)
    .lineTo(612, 206)
    .lineWidth(1)
    .stroke();


  myDoc.end();
};

export { pdfKitCreateEstimatePreview };

/*
 myDoc.moveTo(0, 306)
    .lineTo(792, 306)
    .lineWidth(1)
    .stroke();
*/
