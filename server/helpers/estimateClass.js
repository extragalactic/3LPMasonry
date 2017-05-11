import AWS from 'aws-sdk';
import PDFMake from 'pdfmake';
import path from 'path';
import fs from 'fs';
import moment from 'moment';
import CustomersModel from '../lib/CustomerModel';
import pdfMakeEstimate from './docDefinition';
import PhotosModel from '../lib/PhotosModel';

class EstimateActions {
  constructor(customer, generics, text, preview) {
    this.customer = customer;
    this.preview = preview;
    this.text = text;
    this.generics = generics;
    this.images = [];
    this.prices = [];
    this.s3 = new AWS.S3({ region: 'us-east-2' });
  }
  getPrices() {
    const prices = new Promise((resolve, reject) => {
      CustomersModel.findOne({ _id: this.customer._id })
        .then((customer) => {
          customer.prices.forEach((price) => {
            this.prices.push([price.description, `$${price.amount} +HST`]);
            if (price.option1.description) {
              this.prices.push(['OR', '']);
              this.prices.push([price.option1.description, `$${price.option1.amount} +HST`]);
            }
            if (price.option2.description) {
              this.prices.push(['OR', '']);
              this.prices.push([price.option2.description, `$${price.option2.amount} +HST`]);
            }
            if (price.option3.description) {
              this.prices.push(['OR', '']);
              this.prices.push([price.option3.description, `$${price.option3.amount} +HST`]);
            }
            if (price.option4.description) {
              this.prices.push(['OR', '']);
              this.prices.push([price.option4.description, `$${price.option4.amount} +HST`]);
            }
            if (price.option5.description) {
              this.prices.push(['OR', '']);
              this.prices.push([price.option5.description, `$${price.option5.amount} +HST`]);
            }
          });
          if (this.prices.length === 0) {
            reject(console.error('no prices!'));
          }
          resolve(this.prices);
        });
    });
    return prices;
  }
  convertImage(photoBlob) {
    const image = new Promise((resolve, reject) => {
      PhotosModel.findOne({ docID: photoBlob.docID })
        .then((p) => {
          resolve(p.base64);
        });
    });
    return image;
  }
  convertImagesToString() {
    const images = new Promise((resolve, reject) => {
      CustomersModel.findOne({ _id: this.customer })
         .then((customer) => {
           const allImages = customer.survey.photos.filter(((image) => {
             if (image.selected) {
               return image;
             }
           })).map(img => this.convertImage(img).then(res => res),
        );
           Promise.all(allImages)
            .then(image => resolve(image));
         });
    });
    return images;
  }


  generatePDF() {
    const url = `${this.customer._id}/${this.customer.firstName}${this.customer.lastName}${moment().format('ddddMMMMDoYYYYmmss')}Estimate.pdf`;
    const fonts = {
      Roboto: {
        normal: path.join(__dirname, '../../assets/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../../assets/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../../assets/fonts/Roboto-Italic.ttf'),
      },
      Verdana: {
        normal: path.join(__dirname, '../../assets/fonts/Verdana-Regular.ttf'),
        bold: path.join(__dirname, '../../assets/fonts/Verdana-Bold.ttf'),
      },
    };
    const pdfUrl = new Promise((resolve, response) => {
      this.convertImagesToString()
     .then((images) => {
       this.getPrices()
         .then((prices) => {
           pdfMakeEstimate(this.customer, this.generics, prices, images, this.text)
            .then((definition) => {
              const printer = new PDFMake(fonts);
              const pdfDoc = printer.createPdfKitDocument(definition);
              pdfDoc.pipe(fs.createWriteStream('documents/temp.pdf'));
              pdfDoc.end();
              setTimeout(() => {
                fs.readFile('documents/temp.pdf', {}, (err, res) => {
                  const params = {
                    Bucket: '3lpm',
                    Key: url,
                    Expires: 60,
                    ACL: 'public-read',
                    ContentType: 'application/pdf',
                    Body: res,
                  };
                  this.s3.upload(params, (err, res) => {
                    CustomersModel.findOne({ _id: this.customer._id })
                      .then((customer) => {
                        customer.estimatePDF = res.Location;
                        if (this.preview) {
                          customer.previewHistory.push({
                            url: res.Location,
                            timestamp: moment().format('dddd, MMMM, Do, YYYY, mm:ss'),
                            estimator: customer.estimator,
                          });
                        } else {
                         customer.estimateHistory.push({
                           url: res.Location,
                           timestamp: moment().format('dddd, MMMM, Do, YYYY, mm:ss'),
                           estimator: customer.estimator,
                           preview: this.preview,
                         });
                        }
                        customer.save();
                      });
                    resolve(res.Location);
                  });
                });
              }, 1000);
            });
         });
     });
    });


    return pdfUrl;
  }
  get pdfUrl() {
    return this.generatePDF();
  }

}

export default EstimateActions;
