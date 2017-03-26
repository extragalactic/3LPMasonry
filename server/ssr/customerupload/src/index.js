import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './index.css';

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
    <Router history={browserHistory} routes={routes} />
  </ApolloProvider>,
  document.getElementById('root'),
);
