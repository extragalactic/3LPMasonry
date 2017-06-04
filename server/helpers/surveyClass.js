import CustomersModel from '../lib/CustomerModel';

class SurveyClass {
  constructor(customer) {
    this.customer = customer;
  }
  removePhotofromSurvey(index) {
    CustomersModel.findOne({ _id: this.customer })
     .then((customer) => {
       customer.survey.photos.splice(index, 1);
       customer.save();
     });
  }
}


export default SurveyClass;
