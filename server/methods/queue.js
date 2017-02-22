import QueueModel from '../lib/queueModel';

const addCustomertoQueue = (customer) => {
  QueueModel.findOne({ customer: customer._id })
      .then((data) => {
        if (data === null) {
          const queueItem = new QueueModel({
               customer: customer._id,
               timestamp: new Date(),
               accepted: false,
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
