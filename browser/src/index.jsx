import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';

import routes from './routes';
import { customerReducer } from './reducers/currentCustomer';
import { autoCompleteReducer } from './reducers/autoCompleteAddress';

if (module.hot) {
  module.hot.accept();
}

const client = new ApolloClient({
  connectToDevTools: true,
  networkInterface: createNetworkInterface({
    uri: '/graphql',
    opts: {
      credentials: 'same-origin',
    },
  },
    {
      shouldBatch: true,
      initialState: window.__APOLLO_STATE__,
    },
  ),
});

const store = createStore(combineReducers({
    form: formReducer,
    currentCustomer: customerReducer,
    apollo: client.reducer(),
    autoComplete: autoCompleteReducer,
  }), composeWithDevTools(
  applyMiddleware(client.middleware()),
  // other store enhancers if any
));


/*
const store = createStore(
  combineReducers({
    form: formReducer,
    currentCustomer: customerReducer,
    apollo: client.reducer(),
  }),
  {},
  compose(
      applyMiddleware(client.middleware()),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);
*/

ReactDOM.render(
  <ApolloProvider client={client} store={store} >
    <Router history={browserHistory} routes={routes} store={store} />
  </ApolloProvider>
  ,document.getElementById('app'));

