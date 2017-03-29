import gql from 'graphql-tag';

const toggleSurveyReady = gql `
  mutation toggleSurveyReady($custid: String, $userid: String, $online: Boolean){
  toggleSurveyReady(custid: $custid, userid: $userid, online: $online) {
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
    {
      heading
      description
      timestamp
      user
      orginalBase64
      editedlBase64
     }
  }`;

const addSurveyNotes = gql`
  mutation addSurveyNotes(
  $custid: String, 
  $userid: String,
  $heading: String,
  $description: String, 
  $text: String, 
  $timestamp: String, 
  $user: String,
  $online: Boolean,
  ){
    addSurveyNotes(
      custid: $custid,
      userid: $userid,
      heading: $heading,
      description: $description,
      text: $text,
      timestamp: $timestamp,
      user: $user,
      online: $online,
    )
    {
      heading
      description
      text
      timestamp
      user
     }
  }`;
export { toggleSurveyReady, addSurveyPhoto, addSurveyNotes };
