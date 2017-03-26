import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './index.css';
import App from './App';


const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://tlpm.ca/graphql',
    opts: {
      credentials: 'same-origin',
    },
  }),
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
   </ApolloProvider>
,
  document.getElementById('root'),
);

/*
  <ApolloProvider client={client}>
    <Router history={browserHistory} routes={routes} />
  </ApolloProvider>
*/