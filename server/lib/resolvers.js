import Customers from './connectors';

const Resolvers = {
  Query: {
    customer(root, args, context, info) {
      return Customers.find();
    },
  },

};


export default { Resolvers };
