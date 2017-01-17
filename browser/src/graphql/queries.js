import gql from 'graphql-tag';

const searchAddress = gql`
  query 
    searchAddress($searchTerm:String!){
      address(searchTerm:$searchTerm) {
        description
      } 
  }`;

export { searchAddress };
