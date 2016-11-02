const typeDefinitions = `
type Customer {
 id: Int!
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


  type Query {
      customer(firstName:String): Customer
  }
  schema {
      query: Query
  }

`;
export default [typeDefinitions];
