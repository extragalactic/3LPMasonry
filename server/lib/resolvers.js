const resolveFunctions = {
  Query: {
    customers(_, __, ctx) {
      const customers = new ctx.constructor.Customers();
      return customers.findCustomers();
    },
    customer(_, args, ctx) {
      const customer = new ctx.constructor.Customer();
      return customer.findCustomer(args);
    },
  
    address(_, args, ctx) {
      const address = new ctx.constructor.Address();
      console.log(address.findAddress(args))
      return address.findAddress(args);
    },

},
  Mutation: {
    newCustomer(_, {
      firstName,
      lastName,
      email1,
      email2,
      hphone,
      cphone,
      wphone,
      address,
      notes,
      surveyor,
      estimator,
      status }, ctx) {
      const newCustomer = new ctx.constructor.NewCustomer();
      return newCustomer.submitCustomer({
        firstName,
        lastName,
        email1,
        email2,
        hphone,
        cphone,
        wphone,
        address,
        notes,
        surveyor,
        estimator,
        status });
    },
    updateCustomer(_, {
        id,
        firstName,
        lastName,
        email1,
        email2,
        hphone,
        cphone,
        wphone,
        address,
        notes,
        surveyor,
        estimator,
        status }, ctx) {
      const updateCustomer = new ctx.constructor.UpdateCustomer();
      return updateCustomer.updateCustomer({
        id,
        firstName,
        lastName,
        email1,
        email2,
        hphone,
        cphone,
        wphone,
        address,
        notes,
        surveyor,
        estimator,
        status });
    },
  },
};
module.exports = resolveFunctions;
