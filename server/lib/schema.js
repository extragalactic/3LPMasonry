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
 coordinates: Coordinates
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
  followUp: [followUp] 
}
type Surveyor {
  firstName: String
  lastName: String
  mobile: String
  id: String
}
 type notes {
   text: String
   timestamp: String
   user: String
 }

type Address {
   description: String
}
type Appointment {
  _id: String
  userid: String
  start: String
  end: String
  name: String
  address: String
  description: String
  calid: String
}

type Coordinates {
  latitude: String
  longitude: String
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

type followUp {
  name: String
  start: String
  end: String
  address: String 
  description: String
  calid: String
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
  deleteAppointment(userid: String, meetingid: String, calid: String):Appointment
  getNotes(id:String):[notes]
  getUser(id: String):User
  addNotes(text: String, timestamp: String, user: String, id:String):[notes]
  getAppointmentsforDay(date: String, userid: String):[Appointment]
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
  
  updateCustomer(
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

submitFollowup(userid: String, custid: String, name: String, address: String, start: String, end: String, description: String, calid: String): User

}
  schema {
    query:Query
    mutation:Mutation
  }`;
export default [typeDefinitions];
