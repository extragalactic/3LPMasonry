import gql from 'graphql-tag';

const searchAddress = gql`
  query 
    searchAddress($searchTerm:String!){
      address(searchTerm:$searchTerm) {
        description
      } 
  }`;

const getAllCustomers = gql `
  query{
  customers{
    firstName
    lastName
    email1
    email2
    hphone
    cphone
    wphone
    address
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
      pricing {
        description
        price
      }
    }
  }
}`;

export { searchAddress, getAllCustomers };
