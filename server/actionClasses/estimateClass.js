import sharp from 'sharp';
import AWS from 'aws-sdk';
import CustomersModel from '../lib/CustomerModel';

class EstimateActions {
  constructor(customer, user) {
    this.customer = customer;
    this.user = user;
    this.images = [];
  }
  generatePDF() {
    console.log(this.customer);
    return 'PDFurl';
  }
  get pdfUrl() {
    return this.generatePDF();
  }

}

export default EstimateActions;
