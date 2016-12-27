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
 surveyor: Surveyor
 estimator: String
 status: String
 email1Notification: Boolean
 email2Notification: Boolean
 cellNotification: Boolean
 homeNotification: Boolean
 workNotificaiton: Boolean
 sendSurvey: Boolean
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
  newCustomers: [newCust]
}

type Surveyor {
  firstName: String
  lastName: String
  mobile: String
  id: String
}

type Address {
   description: String
}

type newCust {
   id: String 
   firstName: String
   lastName: String
   email1: String
   email2: String
   hphone: String
   cphone: String
   wphone: String
   address: String
   }

input SurveyorInput {
  firstName: String
  lastName: String
  mobile: String
  id: String
}

input updateDispatch {
  address: String
  cphone: Boolean
  hphone: Boolean
  wphone: Boolean
  email1: Boolean
  email2: Boolean
  survey: Boolean
  surveyor: SurveyorInput
}

input newCustomers {
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
  }

type Query {

  customers(firstName:String, lastName:String, email1: String, email2: String, hphone: String, cphone: String, 
  wphone: String, address: String, notes: String, surveyor: String,estimator: String,status: String ): [Customers]

  customer(id: String!):Customers

  address(searchTerm:String!):[Address]

  users(filter: String):[User]
  
  user(id: String):User
  
  surveyors(filter: String): [Surveyor]
  
  newcustomers(id: String): [newCust]
  
 }

type Mutation {

  submitCustomer(id: String): Customers

  updateDispatchInfo(dispatch: updateDispatch, id: String): Customers

  getCustomer(id: String): Customers

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

updateUser(id: String, firstName: String, lastName: String, mobile:String, surveyor: Boolean, estimator: Boolean, office:Boolean, newCustomers: [newCustomers]) : User

}
  schema {
      query:Query
      mutation:Mutation
  }`;
export default [typeDefinitions];
