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

export { getCustomer, addNotes, getSurveyPhotos };
