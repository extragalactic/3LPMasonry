const typeDefinitions = `
type Customer {
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

type RootQuery {
  customer(firstName:String, lastName:String, email1: String, email2: String, hphone: String, cphone: String, 
  wphone: String, address: String, notes: String, surveyor: String,estimator: String,status: String ): Customer
 }
  schema {
      query: RootQuery
  }

`;
export default [typeDefinitions];
