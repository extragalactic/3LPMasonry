import React from 'react'
import ReactDOM from 'react-dom'
import {Router,browserHistory,applyRouterMiddleware} from 'react-router'
import routes from './routes'
import ApolloClient, {createNetworkInterface} from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

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

ReactDOM.render(
  <ApolloProvider client={client}>
  <Router history={browserHistory} routes={routes}/>
  </ApolloProvider>
  ,document.getElementById('app'))
  module.hot.accept();
   
