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
    emailID: String
    notes: [notes]
    surveyor: Surveyor
    survey: Surveys
    estimator: String
    status: String
    pricing: [[Price]]
    prices: [PricingType]
    email1Notification: Boolean
    email2Notification: Boolean
    cellNotification: Boolean
    homeNotification: Boolean
    workNotificaiton: Boolean
    sendSurvey: Boolean
    coordinates: Coordinates
    estimate: Estimate
    estimatePDF: String
    surveyReadyforPrice: Boolean
    surveyType: Int
    previewHistory: [previewHistory]
    estimateHistory: [estimateHistory]
}

type previewHistory {
    url: String
    estimator: String
    timestamp: String
  }
type estimateHistory {
    url: String
    estimator: String
    timestamp: String
  }
type PriceOptionsType {
  enabled: Boolean
  description: String
  amount: String
}

type PricingType {
  description: String
  amount: String
  numOptions: Int 
  option1: PriceOptionsType
  option2: PriceOptionsType
  option3: PriceOptionsType
  option4: PriceOptionsType
  option5: PriceOptionsType
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
   estimatequeue: [assignedCustomers]
   estimatefollowup: [assignedCustomers]
   estimatesent: [assignedCustomers]
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
type pdfUrl {
  pdfUrl: String
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

type base64PDF {
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

type emailStatus {
  clicks: String
  views: String
  delivery: String
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
    localfile: String
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
  prices: [[Price]]
}

type SurveyPricing {
  description: String
  price: Int
}

type Price {
  description: String
  price:  Int
  _id: String
}

type price {
 description: String
 amount: String
}
 
type Prices {
  description: String
  amount: String
  option1: price
  option2: price
  option3: price
  option4: price
  option5: price 
}
type PriceArray {
  price: [Price]
}

type EstimateResults {
  prices: [Price]
  photos: [String]
}

input PriceInput {
  description: String
  price:  Int
}

input PriceInputArray {
  price: [PriceInput]
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
 watertest: Boolean
 concreteSteps:Boolean
 concreteCare: Boolean
 refacingSlices: Boolean
 refacingComplete: Boolean
 coping: Boolean
 chimney: Boolean
 flagstone: Boolean
 flashing: Boolean
 fwarranty: Boolean
 nbc: Boolean
 obc: Boolean
 pargeex: Boolean
 pwarranty: Boolean
 retaining: Boolean
 roof: Boolean
 sills: Boolean
 tuckpoint:Boolean
 custom: Boolean
 waterproofing: Boolean
 disclaimerA: Boolean
 disclaimerS: Boolean
 tuckpointUniform: Boolean
 surveyInvite: Boolean
 surveyInviteDave: Boolean
 customerClean: Boolean
 additionalWork: Boolean
 warrantyAsStated: Boolean
 existingConcrete: Boolean
}

input PriceOptions {
  enabled: Boolean
  description: String
  amount: String
}

input PricingInput {
  description: String
  amount: String
  numOptions: Int 
  option1: PriceOptions
  option2: PriceOptions
  option3: PriceOptions
  option4: PriceOptions
  option5: PriceOptions
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
  customer(id: String):Customers
  address(searchTerm:String!):[Address]
  users(filter: String):[User]
  user(id: String):User
  surveyors(filter: String): [Surveyor]
  newcustomers(id: String): [newCust]
  getMessages(id: String): [notes]
  getFinishedSurvey(id: String): [FinishedSurvey]
  getMyCustomers(id: String): CustomerStatus
  getPrices:[Price]
  getCustomerStatus(custid: String): String
  getStatus(custid: String): emailStatus
  getEstimateResults(custid: String): EstimateResults
  getFinishedSurveyQuery(id: String): [FinishedSurvey]
}
type Mutation {
  setOneSignalID(userid: String, id: String) : Boolean
  deleteSurveyPhoto(custid: String, index: Int): Boolean
  deleteCustomerfromSurveyor(custid: String, userid: String): Boolean
  deleteCustomerfromEstimator(custid: String, userid: String): Boolean
  dispatchCustomertoUser(custid: String, userid: String): Boolean
  checkConnection: Boolean
  getCustomerPhoto(custid: String, docID: String): SurveyPhotos
  setCustomerStatus(custid: String, userid: String, status: Int): Boolean
  setCustomerStatusEstimator(custid: String, userid: String, status: Int): Boolean
  searchCustomer(searchTerm: String): [Customers]
  addPriceToHistory(description: String): Price
  deletePriceFromHistory(id: String): Boolean
  deletePrice(custid: String, index: Int, Option: String): Boolean
  addPrice(custid: String, price: PricingInput): Prices
  editPriceDescription(custid: String, index: Int, option: String, text: String, amount: String): Boolean
  editPriceAmount(custid: String, index: Int, option: String, amount: String) : Boolean
  addGeneric(heading: String, paragraph: [String], bulletpoints: [String], warranty: String): Generic
  toggleNoReply(custid: String, userid: String): Boolean
  getImageBase64(docID: String): base64Photo
  generatePDFEstimate(custid: String, generics: generics, text: String, preview: Boolean, user: String): pdfUrl
  saveEstimatePDF(custid: String, url: String): Boolean 
  createDocument(custid: String): estimateHistory
  getEstimateResults(custid: String): EstimateResults 
  acceptEstimate(userid: String, custid: String, estimator: String): Customers
  getFinishedSurvey(id: String): [FinishedSurvey]
  addPricing(custid: String, price: [PriceInput]): Boolean
  selectSurveyPhoto(custid: String, index: String): [SurveyPhotosArray]
  toggleSurveyReady(custid: String, userid: String, online: Boolean): Customers
  getSurveyPhotos( id: String ): [SurveyPhotosArray]
  getSurveyLocalPhotos( id: String ): [SurveyPhotosArray]
  deleteSurveyNote(custid: String, index: Int) : Boolean
  addSurveyNotes(
    custid: String,
    userid: String,
    heading: String, 
    description: String, 
    text: String, 
    timestamp: String, 
    user: String,
    online: Boolean
    ): SurveyNotes,
  addSurveyPhoto(
    custid: String,
    heading: String, 
    description: String, 
    orginalBase64: String,
    editedlBase64: String,
    timestamp: String, 
    user: String,
    localfile: String,
    ): Boolean
  deleteAppointment(
    userid: String, 
    meetingid: String, 
    calid: String
    ):Appointment
  getNotes(id:String):[notes]
  addNotes(note: notesInput ):[notes]
  deleteNotes(custid: String, index: Int): Boolean
  getUser(id: String):User
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
