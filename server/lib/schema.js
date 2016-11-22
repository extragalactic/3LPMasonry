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

type User {
  email: String
  _id: String
  firstName:String
  lastName: String
  mobile: String
  surveyor: Boolean
  estimator: Boolean
  office: Boolean
  region: String
}

type Address {
   description: String
}

type Query {

  customers(firstName:String, lastName:String, email1: String, email2: String, hphone: String, cphone: String, 
  wphone: String, address: String, notes: String, surveyor: String,estimator: String,status: String ): [Customers]

  customer(id: String!):Customers

  address(searchTerm:String!):[Address]

  users(filter: String):[User]   

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

updateUser(id: String, firstName: String, lastName: String, mobile:String, surveyor: Boolean, estimator: Boolean, office:Boolean) : User

}
  schema {
      query:Query
      mutation:Mutation
  }
`;
export default [typeDefinitions];
