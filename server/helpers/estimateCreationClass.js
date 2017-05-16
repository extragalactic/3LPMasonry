import AWS from 'aws-sdk';
import PDFMake from 'pdfmake';
import path from 'path';
import fs from 'fs';
import moment from 'moment';
import tz from 'moment-timezone';
import CustomersModel from '../lib/CustomerModel';
import UsersModel from '../lib/UserModel';
import pdfMakeEstimate from './docDefinition';
import PhotosModel from '../lib/PhotosModel';

class EstimateActions {
  constructor(customer, userid, generics, text, preview) {
    this.customer = customer;
    this.userid = userid;
    this.preview = preview;
    this.text = text;
    this.generics = generics;
    this.images = [];
    this.prices = [];
    this.s3 = new AWS.S3({ region: 'us-east-2' });
    this.url = `${this.customer._id}/${this.customer.firstName}${this.customer.lastName}${moment().tz('America/New_York').format('ddddMMMMDoYYYYhmmssa')}Estimate.pdf`;
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
  setStatus() {
    CustomersModel.findOne({_id: this.customer.id})
     .then((customer) => {
       customer.status = 2;
       customer.save();
     });
    UsersModel.findOne({_id: this.userid})
     .then((user) => {
       user.estimates = user.estimates.map((est) => {
          if (est.id == this.customer._id) {
           est.status = 2;
           return est;
         }
         return est;
       });
       user.save();
     });
  }
  generatePDF() {
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
                    Key: this.url,
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
                            timestamp: moment().tz('America/New_York').format('ddddMMMMDoYYYY h:mm:ss a'),
                            estimator: customer.estimator,
                          });
                        } else {
                         customer.estimateHistory.push({
                           url: res.Location,
                           timestamp: moment().tz('America/New_York').format('ddddMMMMDoYYYY h:mm:ss a'),
                           estimator: customer.estimator,
                           preview: this.preview,
                         });
                        }
                        customer.save();
                      });
                    resolve(res.Location);
                  });
                });
              }, 3000);
            });
         });
     });
    });

    return pdfUrl;
  }

  sendPdftoCustomer(url) {
    this.setStatus();
    require('../../node_modules/mailin-api-node-js/V2.0/mailin');
    const client = new Mailin('https://api.sendinblue.com/v2.0', process.env.MAILIN, 5000);
      const emailData = { id: 3,
        to: this.customer.email1 ? this.customer.email1 : this.customer.email2,
        bcc: 'outgoingtlpmail@gmail.com',
        attr: { CUSTOMER: this.customer.firstName, LINK: url.split('//').pop() },
      };
      client.send_transactional_template(emailData).on('complete', (data) => {
        console.log(data);
      });
  }

  get pdfUrl() {
    return this.generatePDF();
  }

}

export default EstimateActions;
