import sharp from 'sharp';
import AWS from 'aws-sdk';
import CustomersModel from '../lib/CustomerModel';

class AwsUtil {
  constructor() {
    this.loading = false;
  }
  convertImgtoString() {
    this.loading = true;
    const generatePDF = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Success!"); // Yay! Everything went well!
      }, 250);
    });
    return generatePDF;
  }

}


export { AwsUtil };
