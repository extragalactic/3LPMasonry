const resolveFunctions = {
  Query: {
    customers(_, __, ctx) {
      const customers = new ctx.constructor.Customers();
      return customers.findCustomers();
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
