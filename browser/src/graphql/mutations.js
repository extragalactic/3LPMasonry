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
   mutation addNote( $custid: String, $text: String, $createdAt: String, $userid: String, $name: String ){
  addNotes(note: {
    createdAt:$createdAt,
    text: $text,
    custid: $custid
    user: {
      name: $name,
      _id: $userid
    }
  }) {
    _id
    text
    createdAt
    user{
      name
      _id
    }
  }
}`;

const deleteNotes = gql `
  mutation deleteNotes($custid: String, $index: Int){
    deleteNotes(custid: $custid, index: $index)
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

const toggleSurveyReady = gql `
  mutation toggleSurveyReady($custid: String, $userid: String){
  toggleSurveyReady(custid: $custid, userid: $userid) {
    id
    firstName
    lastName
  }
}`;
const addSurveyPhoto = gql`
  mutation addSurveyPhoto(
  $custid: String, 
  $heading: String,
  $description: String, 
  $timestamp: String, 
  $user: String,
  $orginalBase64: String,
){
    addSurveyPhoto (
      custid: $custid,
      heading: $heading,
      description: $description,
      timestamp: $timestamp,
      user: $user,
      orginalBase64:$orginalBase64
    )
  }`;

export {
  getImageBase64,
  getCustomer,
  addNotes,
  deleteNotes,
  getSurveyPhotos,
  addGenerics,
  toggleSurveyReady,
  addSurveyPhoto,
};