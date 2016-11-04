const resolveFunctions = {
  RootQuery: {
    customer(_, { firstName }, ctx) {
      const customer = new ctx.constructor.Customers();
      return customer.findCustomer(firstName);
    },
  },
};

module.exports = resolveFunctions;