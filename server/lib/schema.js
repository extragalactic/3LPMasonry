const typeDefinitions = `
type Customers {
 id: String 
 firstName: String
 lastName: String
 email1: String
 email2: String
 hphone: String
 cphone: String
 wphone: String
 address: String
 notes: String
 surveyor: String
 estimator: String
 status: String
}

type Address {
   description: String
}

type Query {

  customers(firstName:String, lastName:String, email1: String, email2: String, hphone: String, cphone: String, 
  wphone: String, address: String, notes: String, surveyor: String,estimator: String,status: String ): [Customers]

  customer(id: String!):Customers

  address(searchTerm:String!):[Address]
}

type Mutation {
  newCustomer(
    firstName: String
    lastName: String
    email1: String
    email2: String
    hphone: String
    cphone: String
    wphone: String
    address: String
    notes: String
    surveyor: String
    estimator: String
    status: String
  ): Customers

    updateCustomer (
    id: String  
    firstName: String
    lastName: String
    email1: String
    email2: String
    hphone: String
    cphone: String
    wphone: String
    address: String
    notes: String
    surveyor: String
    estimator: String
    status: String
  ): Customers
}
  schema {
      query:Query
      mutation:Mutation
  }
`;
export default [typeDefinitions];
