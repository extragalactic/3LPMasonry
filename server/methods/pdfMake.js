import PDFMake from 'pdfmake';
import path from 'path';
import fs from 'fs';
import moment from 'moment';

const pdfMakeEstimate = (customer) => {
  const fonts = {
    Roboto: {
      normal: path.join(__dirname, '../../assets/fonts/Roboto-Regular.ttf'),
      bold: path.join(__dirname, '../../assets/fonts/Roboto-Medium.ttf'),
      italics: path.join(__dirname, '../../assets/fonts/Roboto-Italic.ttf'),
    },
  };

  const docDefinition = {
    pageSize: 'LETTER',
    footer: { text: 'Three Little Pigs Masonry 14845 YongeSt., Unit6-Suite322, Aurora, ON, L4G 6H8 905-508-0500 416-595-0100', alignment: 'center' },
    background: { image: path.join(__dirname, '../../assets/images/tlplogo.jpg'),
      width: 150,
      height: 150,
      alignment: 'right',
    },
    content: [
     { text: 'Three Little Pigs Masonry', alignment: 'center', style: 'header' },
     { text: 'Estimate', alignment: 'center', style: 'estimate' },
     { text: `${moment().format('dddd, MMMM Do YYYY')}`, alignment: 'left' },
     { text: `Prepared for ${customer.firstName} ${customer.lastName} @ ${customer.address}` },
      { style: 'tableExample',
        table: { widths: [400, 100],
          body: [
           ['Description', 'Price'],
           ['Item Description', '$1000'],
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 32,
        bold: true,
        marginRight: 60,
        marginTop: 5,
      },
      estimate: {
        fontSize: 30,
      },
      logo: {
        bottom: 900,
        position: 'relative',
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
    },
  };
  const printer = new PDFMake(fonts);
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(`documents/${customer.firstName}${customer.lastName}Estimate.pdf`));
  pdfDoc.end();
};

export default pdfMakeEstimate;


/*

{ image: path.join(__dirname, '../../assets/images/tlplogo.jpg'),
        width: 150,
        height: 150,
        alignment: 'right',
        style: 'logo',
      },
header: {
      text: 'Three Little Pigs Masonry',
      alignment: 'center',
      style: 'header',
      margin: [10, 0],
    },

var dd = {
	content: [  
		
		{
		    style: 'tableExample',
			table: {
				headerRows: 1,
				// dontBreakRows: true,
				// keepWithHeaderRows: 1,
				body: [
					[{text: 'Description', style: 'tableHeader'}, {text: 'Price', style: 'tableHeader'} ],
					[
						'Roll on Parge',
						'$2000'
					]
				]
			}
		},
		
	],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black',
			width: 600,
		}
	},
	defaultStyle: {
		// alignment: 'justify'
	}
	
}



*/

