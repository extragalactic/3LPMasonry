import QueueModel from '../lib/queueModel';

const addCustomertoQueue = (customer) => {
  QueueModel.findOne({ customer: customer._id })
      .then((data) => {
        if (data === null) {
          const queueItem = new QueueModel({
               id: customer._id,
               firstName: customer.firstName ,
               lastName: customer.lastName,
               email1: customer.email1,
               email2: customer.email2,
               hphone: customer.hphone,
               cphone: customer.cphone,
               wphone: customer.wphone,
               address: customer.address,
           });
            queueItem.save();
          }
      })
};

const removeCustomerfromQueue = (customer) => {
    console.log('REMOVE')
  QueueModel.findOneAndRemove({ customer: customer._id })
    .then(data => console.log(data)).catch(err => console.error(err));
};

export { addCustomertoQueue, removeCustomerfromQueue };





