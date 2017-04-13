import gql from 'graphql-tag';

const searchAddress = gql`
  query 
    searchAddress($searchTerm:String!){
      address(searchTerm:$searchTerm) {
        description
      } 
  }`;


const getCustomer = gql `
  query getCustomer($id: String!){
  customer(id: $id) {
     id
    firstName
    lastName
    estimatePDF
    email1
    email2
    cphone
    hphone
    wphone
    address
    coordinates {
      latitude
      longitude
    }
   surveyor {
      id
      firstName
      lastName
      mobile
    }
    estimator
    status
    notes{
      _id
      text
      user {
        name
        _id
      }
    }
    survey {
      notes {
        heading
        description
        timestamp
        user
        text
    }
      photos{
        heading
        description
        timestamp
        user
        orginalBase64
        editedlBase64
        thumbURL
        thumb
        photo
        caption
        selected
        docID
      }
    }
  }
}`;


const getAllCustomers = gql `
query{
  customers{
    id
    firstName
    lastName
    email1
    email2
    hphone
    cphone
    wphone
    address
    estimatePDF
    coordinates {
      latitude
      longitude
    }
    survey {
      notes {
        heading
        description
        text
        timestamp
        user
      }
      photos {
        heading
        description
        timestamp
        user
        orginalBase64
        editedlBase64
        thumbURL
        thumb
        photo
        caption
        selected
      }
    }
    notes {
      _id
      text
      createdAt
    }
    email2Notification
    email1Notification
    sendSurvey
    estimate{
      photos {
        heading
        description
        timestamp
        user
        orginalBase64
        editedlBase64
        thumbURL
        thumb
        photo
        caption
        selected
      }
    }
    surveyor {
      id
      firstName
      lastName
    }
    status
  }
  
}`;


export { searchAddress, getAllCustomers, getCustomer };