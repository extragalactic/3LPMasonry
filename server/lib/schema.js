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
    notes: [notes]
    surveyor: Surveyor
    survey: Surveys
    estimator: String
    status: String
    email1Notification: Boolean
    email2Notification: Boolean
    cellNotification: Boolean
    homeNotification: Boolean
    workNotificaiton: Boolean
    sendSurvey: Boolean
    coordinates: Coordinates
    estimate: Estimate
}
  type Queue {
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

  type Generic {
    heading: String
    text: String
  }

 type CustomerStatus {
   newcustomers: [assignedCustomers]
   followup: [assignedCustomers]
   onsite: [assignedCustomers]
   inprogress: [assignedCustomers]
   surveycomplete: [assignedCustomers]
   myestimates: [assignedCustomers]
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
    estimates: [myEstimates]
  }
  type Surveyor {
    firstName: String
    lastName: String
    mobile: String
    id: String
  }
type notesUser {
  _id: String
  name: String
}

 type notes {
   _id: String
  text: String
  createdAt: String
  user: notesUser
 }

type SurveyPhotosArray {
  thumb: String
  photo: String
  caption: String
  selected: Boolean
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

type assignedCustomers {
   id: String 
   firstName: String
   lastName: String
   email1: String
   email2: String
   hphone: String
   cphone: String
   wphone: String
   address: String
   status: Int
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
   status: Int
   }

type myEstimates {
   id: String 
   firstName: String
   lastName: String
   email1: String
   email2: String
   hphone: String
   cphone: String
   wphone: String
   address: String
   status: Int
   }

type base64Photo {
  base64: String
  url: String
  docID: String
}

type followUp {
  name: String
  start: String
  end: String
  address: String 
  description: String
  calid: String
}

type Surveys {
  notes: [SurveyNotes]
  photos: [SurveyPhotos]
}

type SurveyNotes {
    heading: String
    description: String
    text: String
    timestamp: String
    user: String
}

type SurveyPhotos {
    heading: String
    description: String
    timestamp: String
    user: String
    orginalBase64: String
    editedlBase64: String
    thumbURL: String
    thumb: String
    photo: String
    caption: String
    selected: Boolean
    docID: String
}

type FinishedSurvey {
  heading: String
  notes: [FinishedSurveyNotes]
  photos: [FinishedSurveyPhotos]

}

type FinishedSurveyNotes {
   description: String
   text: String
   timestamp: String
   user: String
}
type FinishedSurveyPhotos {
   description: String
   caption: String
   timestamp: String
   user: String
   thumb: String
   url: String
   docID: String
}

type Estimate {
  photos: [SurveyPhotos]
  pricing: [SurveyPricing]
}

type SurveyPricing {
  description: String
  price: Int
}

type Price {
  description: String
  price:  Int
}

type EstimateResults {
  prices: [Price]
  photos: [String]
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

 input notesUserInput {
  _id: String
  name: String
}

  input notesInput {
   _id: String
   custid: String
  text: String
  createdAt: String
  user: notesUserInput
 }
input generics {
 banas: Boolean
 concrete: Boolean
 coping: Boolean
 flagstone :Boolean
 flashing : Boolean
 fwarranty : Boolean
 galleryModal : Boolean
 nbc: Boolean
 newcap: Boolean
 newcrown : Boolean
 obc: Boolean
 pargeex: Boolean
 priceText: Boolean
 pricingModal: Boolean
 pwarranty : Boolean
 retaining :Boolean
 roof: Boolean
 sills: Boolean
 tuckpoint:Boolean
 waterproofing: Boolean
}
type Query {
  customers(
    firstName:String, 
    lastName:String, 
    email1: String, 
    email2: String, 
    hphone: String, 
    cphone: String, 
    wphone: String, 
    address: String, 
    notes: String, 
    surveyor: String,
    estimator: String,
    status: String
  ): [Customers]
  getQueue:[Queue]
  customer(id: String!):Customers
  address(searchTerm:String!):[Address]
  users(filter: String):[User]
  user(id: String):User
  surveyors(filter: String): [Surveyor]
  newcustomers(id: String): [newCust]
  getMessages(id: String): [notes]
  getFinishedSurvey(id: String): [FinishedSurvey]
  getMyCustomers(id: String): CustomerStatus
  getPrices: [Price]
  getEstimateResults(custid: String): EstimateResults
  getFinishedSurveyQuery(id: String): [FinishedSurvey]


}
type Mutation {
  addGeneric(heading: String, paragraph: [String], bulletpoints: [String], warranty: String): Generic
  getImageBase64(docID: String): base64Photo
  generatePDFEstimate(custid: String, generics: generics): Customers
  getEstimateResults(custid: String): EstimateResults 
  acceptEstimate(userid: String, custid: String): Customers
  getFinishedSurvey(id: String): [FinishedSurvey]
  addPricing(custid: String, description: String, price: Int): Estimate
  selectSurveyPhoto(custid: String, index: String): [SurveyPhotosArray]
  toggleSurveyReady(custid: String, userid: String): Customers
  getSurveyPhotos( id: String ): [SurveyPhotosArray]
  addSurveyNotes(
    custid: String,
    userid: String,
    heading: String, 
    description: String, 
    text: String, 
    timestamp: String, 
    user: String
    ): SurveyNotes
  addSurveyPhoto(
    custid: String,
    heading: String, 
    description: String, 
    orginalBase64: String,
    editedlBase64: String,
    timestamp: String, 
    user: String
    ): SurveyPhotos
  deleteAppointment(
    userid: String, 
    meetingid: String, 
    calid: String
    ):Appointment
  getNotes(id:String):[notes]
  getUser(id: String):User
  addNotes(note: notesInput ):[notes]
  getAppointmentsforDay(
    date: String, 
    userid: String
  ):[Appointment]
  submitCustomer(id: String): Customers
  updateDispatchInfo(
    dispatch: updateDispatch, 
    id: String
    ): Customers
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
updateUser(
  id: String, 
  firstName: String, 
  lastName: String, 
  mobile:String, 
  surveyor: Boolean, 
  estimator: Boolean, 
  office:Boolean, 
  newCustomers: [newCustomers]
  ): User
submitFollowup(
  userid: String, 
  custid: String, 
  name: String, 
  address: String, 
  start: String, 
  end: String, 
  description: String, 
  calid: String
  ): User
}
  schema {
    query:Query
    mutation:Mutation
  }`;

export default [typeDefinitions];
