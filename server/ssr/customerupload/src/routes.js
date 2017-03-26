import React, { Component } from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './App';
import HandbookContainer from './Handbook/HanbookContainer';


export default (
  <Route path={'/'}>
    <IndexRedirect to="/home" />
    <Route path={'/home'} component={App} />
    <Route path="/handbook" component={HandbookContainer} />
  </Route>
  );


