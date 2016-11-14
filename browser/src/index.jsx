import React from 'react'
import ReactDOM from 'react-dom'
import {Router,browserHistory,applyRouterMiddleware} from 'react-router'
import routes  from './routes'
import ApolloClient, {createNetworkInterface} from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { reducer as formReducer } from 'redux-form';

if (module.hot) {
  module.hot.accept();
}

const client = new ApolloClient({
  networkInterface : createNetworkInterface({
    uri: '/graphql',
    opts: {
      credentials: 'same-origin',
    }
  },
    {
      shouldBatch: true,
      initialState: window.__APOLLO_STATE__
    }
  )
})

const store = createStore(
  combineReducers({
    form: formReducer,
    apollo: client.reducer(),
  }),
  {}, 
  compose(
      applyMiddleware(client.middleware()),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
);
ReactDOM.render(
  <ApolloProvider client={client} store={store} >
  <Router history={browserHistory} routes={routes}/>
  </ApolloProvider>
  ,document.getElementById('app'))

