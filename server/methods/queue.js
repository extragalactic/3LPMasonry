import QueueModel from '../lib/queueModel';
import CustomerModel from '../lib/CustomerModel';

const addCustomertoQueue = (customer) => {
  QueueModel.findOne({ customer: customer._id })
      .then((data) => {
        if (data === null) {
          const queueItem = new QueueModel({
            id: customer._id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email1: customer.email1,
            email2: customer.email2,
            hphone: customer.hphone,
            cphone: customer.cphone,
            wphone: customer.wphone,
            address: customer.address,
          });
          queueItem.save().then((res) => {
            CustomerModel.findOne({ _id: customer._id })
             .then((customer) => {
               customer.estimateQueueId = res._id;
               customer.save();
             });
          });
        }
      });
};

const removeCustomerfromQueue = (customer) => {
  QueueModel.findByIdAndRemove(customer.estimateQueueId)
    .then(data => console.log(data)).catch(err => console.error(err));

  CustomerModel.findOne({ _id: customer.id })
  .then((customer) => {
    customer.estimateQueueId = '';
    customer.save();
  });
};

export { addCustomertoQueue, removeCustomerfromQueue };

