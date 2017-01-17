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
    }
  }`;

const addNotes = gql `
   mutation addNotes ($id: String, $text: String, $user: String, $timestamp : String ){
  addNotes(id: $id, text: $text, user: $user, timestamp: $timestamp){
    user
  }
}`;

export { getCustomer, addNotes };
