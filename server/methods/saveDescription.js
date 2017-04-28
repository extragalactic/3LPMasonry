import PricingModel from '../lib/PricingModel';

const saveDescription = (description, price) => {
  PricingModel.findOne({ description })
    .then((data) => {
      if (!data && description) {
        const newPrice = new PricingModel({
          description,
          price,
        });
        newPrice.save().then(result => console.log(result)).catch(err => console.log(err));
      }
    });
};

export default saveDescription;
