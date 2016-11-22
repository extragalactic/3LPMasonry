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
      return address.findAddress(args);
    },
   
     users(_, __, ctx) {
      const users = new ctx.constructor.Users();
      return users.findUsers();
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
    updateUser(_, args, ctx) {
      const users = new ctx.constructor.UpdateUser();
      return users.updateUser(args);
    },

   },
};
module.exports = resolveFunctions;
