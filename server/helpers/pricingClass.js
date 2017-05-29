import CustomersModel from '../lib/CustomerModel';
import PricingModel from '../lib/PricingModel';


class PricingClass {
  constructor(customer) {
        this.customer = customer;
    }

  checkPriceExist(){
    PricingModel.find()
     .then((price) => { AllPrices.push(price); });

    Promise.all(AllPrices)
     .then((prices) => {
         console.log(prices)
     })
  }

  addPricetoEstmate() {
       console.log('addPrice')
       this.checkPriceExist()
  }
}


export default PricingClass;

/*
      if (args.price.description) {
        saveDescription(args.price.description, args.price.amount);
        if (args.price.option1.description) {
          saveDescription(args.price.option1.description, args.price.option1.amount);
        }
        if (args.price.option2.description) {
          saveDescription(args.price.option2.description, args.price.option2.amount);
        }
        if (args.price.option3.description) {
          saveDescription(args.price.option3.description, args.price.option3.amount);
        }
        if (args.price.option4.description) {
          saveDescription(args.price.option4.description, args.price.option4.amount);
        }
        if (args.price.option5.description) {
          saveDescription(args.price.option5.description, args.price.option5.amount);
        }

        CustomersModel.findOne({ _id: args.custid })
          .then((customer) => {
            if (!customer.prices) {
             customer.prices = [];
            }
            customer.prices.push(args.price);
            customer.save();
          });
        return args.price;
      }
*/
