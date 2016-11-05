const resolveFunctions = {
  Query: {
    customers(_, __, ctx) {
      console.log(_, _, ctx);
      const customers = new ctx.constructor.Customers();
      return customers.findCustomers();
    },
  },
};

module.exports = resolveFunctions;
