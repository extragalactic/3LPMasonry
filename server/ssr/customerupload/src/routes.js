import React, { Component } from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './App';
import HandbookContainer from './Handbook/HanbookContainer';


export default (
  <Route path={'/'}>
    <Route path={'/home'} component={App} />
    <Route path="/handbook" component={HandbookContainer} />
  </Route>
  );


