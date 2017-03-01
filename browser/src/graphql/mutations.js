import gql from 'graphql-tag';

const getCustomer = gql`
  mutation getCustomer($id: String){
    getCustomer(id:$id) {
      id
      firstName
      lastName
      email1
      email2
      cphone
      hphone
      wphone
      address
      notes {
        _id
        text
        user {
          name
          _id
        }
      }
    }
  }`;

const addNotes = gql `
   mutation addNotes ($custid: String, $text: String, $user: String, $timestamp : String ){
  addNotes(custid: $custid, text: $text, user: $user, timestamp: $timestamp){
    user
  }
}`;

const getSurveyPhotos = gql`
  mutation getSurveyImaged($id: String){
  getSurveyPhotos(id: $id) {
    thumb
    photo
    caption
    selected
  }
}`;

const getImageBase64 = gql `
  mutation getPhotoBase64($docID: String){
  getImageBase64(docID:$docID){
    base64
    url
    docID
  }
} `;

const addGenerics = gql `
  mutation addGeneric($heading: String, $paragraph: [String], $warranty: String, $bulletpoints: [String]){
  addGeneric(heading:$heading, paragraph: $paragraph, bulletpoints: $bulletpoints, warranty: $warranty){
    heading
  }
}`;


export { getImageBase64, getCustomer, addNotes, getSurveyPhotos, addGenerics };
